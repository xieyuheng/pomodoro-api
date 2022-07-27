import crypto from "crypto"
import { Model, ModelConstructor } from "./Model"
import { Redis } from "./Redis"

export class Repository<TModel extends Model<any>> {
  constructor(public redis: Redis, public clazz: ModelConstructor<TModel>) {}

  get client() {
    return this.redis.client
  }

  create(json: TModel extends Model<infer T> ? T : never): TModel {
    const model = new this.clazz()

    Object.assign(model, json)

    model.repository = this
    model.id = crypto.randomUUID()
    model.json = () => {
      // TODO filter by schema properties
      return Object.assign({}, model)
    }

    return model
  }

  formatKey(id: string): string {
    return `${this.clazz.name}:${id}`
  }

  async save(model: TModel): Promise<void> {
    const key = this.formatKey(model.id)
    await this.client.json.set(key, "$", model.json())
  }
}
