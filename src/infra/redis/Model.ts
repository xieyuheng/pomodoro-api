import { Repository } from "./Repository"

export type ModelConstructor<TModel> = new () => TModel

export class Model<T> {
  _phantom?: T
  repository!: Repository<Model<T>>
}
