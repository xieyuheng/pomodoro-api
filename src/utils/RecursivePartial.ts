export type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends number | string | symbol | undefined
    ? T[P]
    : RecursivePartial<T[P]>
}
