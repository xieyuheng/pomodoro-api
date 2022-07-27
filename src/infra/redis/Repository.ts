import crypto from "crypto"
import { Model, ModelConstructor } from "./Model"
import { Redis } from "./Redis"

type JsonOfModel<TModel extends Model<any>> = TModel extends Model<infer T>
  ? T
  : never

export class Repository<TModel extends Model<any>> {
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
    Object.assign(model, json)
    this.enrich(model, id)
    return model
  }

  private enrich(model: TModel, id?: string): void {
    model._repository = this
    model.id = id || crypto.randomUUID()
    model._key = this.formatKey(model.id)
    model.json = () => {
      const keys = Object.keys(model.schema.properties)
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

  async save(model: TModel): Promise<void> {
    const key = this.formatKey(model.id)
    await this.client.json.set(key, "$", model.json())
  }

  async get(id: string): Promise<TModel> {
    const key = this.formatKey(id)
    const json = await this.client.json.get(key)
    return this.create(this.schema.validate(json), id)
  }

  async update(
    id: string,
    json: RecursivePartial<JsonOfModel<TModel>>
  ): Promise<void> {
    if (json === undefined) return
    const key = this.formatKey(id)
    const record = flattenJson(json as JsonObject)
    for (const [path, value] of Object.entries(record))
      await this.client.json.set(key, path, value)
  }
}

type Json = string | number | boolean | null | Array<Json> | JsonObject

type JsonObject = { [x: string]: Json }

type LeafJson = string | number | boolean | null | Array<Json>

function isLeafJson(json: Json): json is LeafJson {
  return typeof json !== "object" || json instanceof Array
}

function flattenJson(json: JsonObject): Record<string, LeafJson> {
  const record = {}
  flattenJsonCollect(json, "$", record)
  return record
}

function flattenJsonCollect(
  json: { [x: string]: Json },
  path: string = "$",
  record: Record<string, LeafJson>
): void {
  for (const [key, value] of Object.entries(json)) {
    const next = `${path}.${key}`
    if (isLeafJson(value)) {
      record[next] = value
    } else {
      flattenJsonCollect(value, next, record)
    }
  }
}

type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends object
    ? RecursivePartial<T[P]>
    : T[P]
}
