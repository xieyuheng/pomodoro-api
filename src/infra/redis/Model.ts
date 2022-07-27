import { Repository } from "./Repository"
import { Schemas } from "@xieyuheng/ty"

export type ModelConstructor<TModel> = new () => TModel

export abstract class Model<T> {
  _phantom?: T
  repository!: Repository<Model<T>>
  id!: string
  json!: () => T

  abstract schema: Schemas.ObjectSchema<T>

  get age(): number {
    return 100
  }

  async save(): Promise<void> {
    await this.repository.save(this)
  }
}
