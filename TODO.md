# backend

- `models/EmailLogin`

- `controllers/EmailLoginController`

- `api/login`
- `api/login/[token]/confirm`
- `api/login/[token]/verify`
- `api/login/[token]/revoke`

- `controllers/EmailLoginController` -- `create`
- `controllers/EmailLoginController` -- `verify`
- `controllers/EmailLoginController` -- `confirm`
- `controllers/EmailLoginController` -- `revoke`

- add `expire` to `EmailRegister.create`
- add `expire` to `EmailLogin.create`

- `User` keep `username` and `email` unique

  - `useForm` to handle backend error

# frontend

- `components/login/LoginStart.vue`
- `components/login/Login.vue`

- be able to config `settings.modes`

- be able to save `tasks`

# refactor

- `Repo` -- `createIndex` to side effect to `Model`
- `Repo` -- query by schema

- [upstream] use `schema.keys()`

- use `LIMIT 0 10` to implement `firstWhere`

- be able to config `Repo` log behavior

- `Repo` -- migration be able to `dropIndex`

  - FT.DROPINDEX myIdx
  - FT.DROPINDEX myIdx DD

- `Repo` -- api about auto-complete

  - https://redis.io/commands/ft.sugadd/
  - https://redis.io/commands/ft.sugget/

- `Repo` -- `createIndex` from `ty.Schema`

  - https://redis.io/commands/ft.create/
  - https://redis.io/docs/stack/search/design/indexing/

- `Repo` -- `where`

  - `Query` expression format to redis search query
  - learn from laravel Eloquent API
    - https://laravel.com/docs/9.x/eloquent#retrieving-models
  - learn from laravel Query Builder
    - https://laravel.com/docs/9.x/queries
    - https://redis.io/docs/stack/search/reference/query_syntax/
  - `where().first()`
  - `where().firstOrFail()`
  - `where().all()`

- abstract `Repo` and `RedisRepo`
- abstract `Repo` and `FiRepo`

# learn

- [learn nuxt] internals

  - https://v3.nuxtjs.org/guide/going-further/internals/

- [learn nuxt] module API

  - https://v3.nuxtjs.org/guide/going-further/modules/

- [learn nuxt] nuxt/content

  - https://github.com/nuxt/content

- [learn redis] redis sorted set
- [learn redis] redis list
- [learn redis] redis set
