import { Schemas } from "@xieyuheng/ty"
import { Repo } from "./Repo"

export type ModelConstructor<TModel> = new () => TModel

export type JsonOfModel<TModel extends Model<any>> = TModel extends Model<
  infer T
>
  ? T
  : never

export abstract class Model<T> {
  _phantom?: T

  _repo!: Repo<Model<T>>
  _key!: string

  id!: string
  json!: () => T

  abstract schema: Schemas.ObjectSchema<T>

  async save(): Promise<void> {
    await this._repo.save(this)
  }

  async delete(): Promise<void> {
    await this._repo.delete(this.id)
  }

  async expire(seconds: number): Promise<void> {
    await this._repo.expire(this.id, seconds)
  }
}
