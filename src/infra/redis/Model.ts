import { Repository } from "./Repository"
import { Schemas } from "@xieyuheng/ty"

export type ModelConstructor<TModel> = new () => TModel

export type JsonOfModel<TModel extends Model<any>> = TModel extends Model<
  infer T
>
  ? T
  : never

export abstract class Model<T> {
  _phantom?: T

  _repository!: Repository<Model<T>>
  _key!: string

  id!: string
  json!: () => T

  abstract schema: Schemas.ObjectSchema<T>

  async save(): Promise<void> {
    await this._repository.save(this)
  }
}
