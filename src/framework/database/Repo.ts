import crypto from "crypto"
import { DeepPartial } from "utility-types"
import { flattenJson, JsonObject } from "../utils/flattenJson"
import { JsonOfModel, Model, ModelConstructor } from "./Model"
import { Redis } from "./Redis"

export class Repo<TModel extends Model<any>> {
  constructor(public redis: Redis, public clazz: ModelConstructor<TModel>) {}

  get client() {
    return this.redis.client
  }

  get schema() {
    const model = new this.clazz()
    return model.schema
  }

  create(json: JsonOfModel<TModel>, id?: string): TModel {
    const model = new this.clazz()
    this.assignProperties(model, json)
    this.enrich(model, id)
    return model
  }

  async createAndSave(json: JsonOfModel<TModel>, id?: string): Promise<TModel> {
    const model = await this.create(json, id)
    await model.save()
    return model
  }

  private assignProperties(model: TModel, json: JsonOfModel<TModel>): void {
    const keys = Object.keys(this.schema.properties)
    for (const key of keys) {
      ;(model as any)[key] = json[key]
    }
  }

  private enrich(model: TModel, id?: string): void {
    model._repo = this
    model.id = id || crypto.randomUUID()
    model._key = this.formatKey(model.id)
    model.json = () => {
      const keys = Object.keys(this.schema.properties)
      const json: any = {}
      for (const key of keys) {
        json[key] = (model as any)[key]
      }
      return json
    }
  }

  formatKey(id: string): string {
    return `${this.clazz.name}:${id}`
  }

  parseKey(key: string): { name: string; id: string } {
    const [name, id] = key.split(":")
    return { name, id }
  }

  async save(model: TModel): Promise<void> {
    const key = this.formatKey(model.id)
    await this.client.json.SET(key, "$", model.json())
  }

  async find(id: string): Promise<TModel | undefined> {
    const key = this.formatKey(id)
    const json = await this.client.json.GET(key)
    if (json === null) return undefined
    return this.create(this.schema.validate(json), id)
  }

  async findOrFail(id: string): Promise<TModel> {
    const key = this.formatKey(id)
    const json = await this.client.json.GET(key)
    if (json === null) {
      throw new Error(`Fail to find ${id} for ${this.clazz.name}`)
    }

    return this.create(this.schema.validate(json), id)
  }

  async exists(id: string): Promise<boolean> {
    const key = this.formatKey(id)
    const flag = await this.client.EXISTS(key)
    return Boolean(flag)
  }

  async delete(id: string): Promise<void> {
    const key = this.formatKey(id)
    await this.client.DEL(key)
  }

  async expire(id: string, seconds: number): Promise<void> {
    const key = this.formatKey(id)
    await this.client.EXPIRE(key, seconds)
  }

  async update(
    id: string,
    json: DeepPartial<JsonOfModel<TModel>>
  ): Promise<void> {
    if (json === undefined) return
    const key = this.formatKey(id)
    const record = flattenJson(json as JsonObject)
    for (const [path, value] of Object.entries(record)) {
      await this.client.json.SET(key, path, value)
    }
  }

  get indexKey(): string {
    return `${this.clazz.name}:index`
  }

  async createIndex(indexJson: any): Promise<void> {
    const indexList = await this.client.ft._LIST()
    if (indexList.includes(this.indexKey)) {
      console.log({
        who: "Repo.createIndex",
        message: "Index already exists.",
        indexKey: this.indexKey,
        indexList,
      })

      return
    }

    const fields: Array<string> = []
    const record = flattenJson(indexJson as JsonObject)
    for (const [path, value] of Object.entries(record)) {
      if (typeof value === "string") {
        fields.push(`$.${path} AS ${path} ${value}`)
      } else {
        console.log({
          who: "Repo.createIndex",
          message: `Unknown index value.`,
          path,
          value,
        })
      }
    }

    const parts = [
      "FT.CREATE",
      this.indexKey,
      "ON",
      "JSON",
      "PREFIX",
      "1",
      `${this.clazz.name}:`,
      "SCHEMA",
      ...fields.flatMap((field) => field.split(" ")),
    ]

    console.log({
      who: "Repo.createIndex",
      command: parts.join(" "),
    })

    await this.client.sendCommand(parts)
  }

  async allWhere(
    json: DeepPartial<JsonOfModel<TModel>>
  ): Promise<Array<TModel>> {
    const fields: Array<string> = []
    const record = flattenJson(json as JsonObject)
    for (let [path, value] of Object.entries(record)) {
      const prefix = path.split(".").join("\\.")
      if (typeof value === "string") {
        value = this.redis.escapeTag(value)
      }

      fields.push(`@${prefix}:{${value}}`)
    }

    const query = fields.join(" ")

    console.log({
      who: "Repo.allWhere",
      query,
    })

    const { documents } = await this.client.ft.SEARCH(this.indexKey, query)

    return documents.map(({ id: key, value: json }) => {
      const { id } = this.parseKey(key)
      return this.create(this.schema.validate(json), id)
    })
  }

  async firstWhere(
    json: DeepPartial<JsonOfModel<TModel>>
  ): Promise<TModel | undefined> {
    const models = await this.allWhere(json)
    return models[0]
  }
}
