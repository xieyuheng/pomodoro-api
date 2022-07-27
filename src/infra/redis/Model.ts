import { Repository } from "./Repository"

export type ModelConstructor<TModel> = new () => TModel

export class Model<T> {
  _phantom?: T
  repository!: Repository<Model<T>>
  id!: string
  json!: () => T

  get age(): number {
    return 100
  }

  async save(): Promise<void> {
    await this.repository.save(this)
  }
}
