import { createClient } from "redis"
import { Model, ModelConstructor } from "./Model"
import { Repository } from "./Repository"

type Client = ReturnType<typeof createClient>

export class Redis {
  client: Client

  constructor(options: { client: { url?: string } }) {
    this.client = createClient(options.client)
  }

  repository<T, TModel extends Model<T>>(
    clazz: ModelConstructor<TModel>,
  ): Repository<TModel> {
    return new Repository(this, clazz)
  }
}
