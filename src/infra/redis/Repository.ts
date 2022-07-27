import crypto from "crypto"
import { flattenJson, JsonObject } from "../../utils/flattenJson"
import { RecursivePartial } from "../../utils/RecursivePartial"
import { JsonOfModel, Model, ModelConstructor } from "./Model"
import { Redis } from "./Redis"

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

  async find(id: string): Promise<TModel | null> {
    const key = this.formatKey(id)
    const json = await this.client.json.get(key)
    if (json === null) return null
    return this.create(this.schema.validate(json), id)
  }

  async findOrFail(id: string): Promise<TModel> {
    const key = this.formatKey(id)
    const json = await this.client.json.get(key)
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
    json: RecursivePartial<JsonOfModel<TModel>>
  ): Promise<void> {
    if (json === undefined) return
    const key = this.formatKey(id)
    const record = flattenJson(json as JsonObject)
    for (const [path, value] of Object.entries(record))
      await this.client.json.set(key, path, value)
  }
}
