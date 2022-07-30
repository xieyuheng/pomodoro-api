import { createClient } from "redis"
import { Model, ModelConstructor } from "./Model"
import { Repo } from "./Repo"

type Client = ReturnType<typeof createClient>

export class Redis {
  client: Client

  constructor(options: { client: { url?: string } }) {
    this.client = createClient(options.client)
  }

  repo<T, TModel extends Model<T>>(
    clazz: ModelConstructor<TModel>
  ): Repo<TModel> {
    return new Repo(this, clazz)
  }

  formatHash(record: Record<string, string>): Array<string> {
    return Object.entries(record).flatMap(([key, value]) => [key, value])
  }
}
