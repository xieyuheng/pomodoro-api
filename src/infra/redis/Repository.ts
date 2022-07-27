import { Model, ModelConstructor } from "./Model"
import crypto from "crypto"

export class Repository<TModel extends Model<any>> {
  constructor(public clazz: ModelConstructor<TModel>) {}

  create(json: TModel extends Model<infer T> ? T : never): TModel {
    const model = new this.clazz()
    Object.assign(model, json)
    model.repository = this
    model.id = crypto.randomUUID()
    return model
  }

  async put(model: TModel): Promise<void> {
    //
  }
}
