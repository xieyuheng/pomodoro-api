import { Model, ModelConstructor } from "./Model"

export class Repository<TModel extends Model<any>> {
  constructor(public clazz: ModelConstructor<TModel>) {}

  create(json: TModel extends Model<infer T> ? T : never): TModel {
    const model = new this.clazz()
    Object.assign(model, json)
    model.repository = this
    return model
  }
}
