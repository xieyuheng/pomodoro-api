import { createClient, SchemaFieldTypes } from "redis"
import { Model, ModelConstructor } from "./Model"
import { Repository } from "./Repository"

type Client = ReturnType<typeof createClient>

export class Redis {
  client: Client

  constructor(options: { client: { url?: string } }) {
    this.client = createClient(options.client)
  }

  repository<T, TModel extends Model<T>>(
    clazz: ModelConstructor<TModel>
  ): Repository<TModel> {
    return new Repository(this, clazz)
  }

  formatHash(record: Record<string, string>): Array<string> {
    return Object.entries(record).flatMap(([key, value]) => [key, value])
  }

  formatIndexKey<T, TModel extends Model<T>>(
    clazz: ModelConstructor<TModel>
  ): string {
    return `${clazz.name}:index`
  }

  async createIndex<T, TModel extends Model<T>>(
    clazz: ModelConstructor<TModel>,
    record: any
  ): Promise<void> {
    const key = this.formatIndexKey(clazz)
    const indexList = await this.client.ft._LIST()
    if (indexList.includes(key)) {
      console.log({ indexList })
      return
    }

    await this.client.ft.CREATE(key, record, {
      ON: "JSON",
      PREFIX: clazz.name,
    })
  }
}
