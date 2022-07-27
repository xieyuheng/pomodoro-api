import { createClient } from "redis"
import { Model, ModelConstructor } from "./Model"
import { Repository } from "./Repository"

type Client = ReturnType<typeof createClient>

export class Redis {
  client: Client

  constructor(options: { url?: string }) {
    this.client = createClient(options)
  }

  repository<TModel extends Model<any>>(
    clazz: ModelConstructor<TModel>
  ): Repository<TModel> {
    return new Repository(clazz)
  }
}
