export class Entity<T> {
  phantom?: T
}

export type UserJson = {
  username: string
  name: string
  email: string
}

export interface User extends UserJson {}
export class User extends Entity<UserJson> {
  age = 1
  method() {}
}

export type EntityConstructor<TEntity> = new () => TEntity

function create<TEntity extends Entity<any>>(
  clazz: EntityConstructor<TEntity>,
  json: TEntity extends Entity<infer T> ? T : never
): TEntity {
  const record = new clazz()
  Object.assign(record, json)
  return record
}

const user = create(User, {
  username: "xieyuheng",
  name: "Xie Yuheng",
  email: "",
})

console.log(user.name)
