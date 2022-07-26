export abstract class Entity<T> {
  abstract json: T
}

export type UserJson = {
  username: string
  name: string
  email: string
}

export interface User extends UserJson {
  json: UserJson
}
export class User extends Entity<UserJson> {
  field: number = 1

  get getter(): string {
    return "hi"
  }

  method() {
    console.log("hi~")
  }
}

export type EntityConstructor<TEntity> = new () => TEntity

function create<T, TEntity extends Entity<T>>(
  clazz: EntityConstructor<TEntity>,
  json: {
    [K in keyof TEntity["json"]]: TEntity["json"][K]
  }
): TEntity {
  const entity = new clazz()
  Object.assign(entity, json)
  return entity
}

const user = create(User, {
  username: "xieyuheng",
  name: "Xie Yuheng",
  // Why this can type check, without email?
  email: "xyheme@gmail.com",
})

console.log(user.name)
