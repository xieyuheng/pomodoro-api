- setup routes
- parse and pass route params to controller action

- [maybe] inject `server` and `router` to `Controller`

- fix `AccessTokenController.auth` -- set `auth` object
- fix `UserController.current` get `user` from `auth` object

- setup `env`
- vercel `api/` use server

# features

- be able to save `settings`
- be able to save `tasks`

- `/settings` be able to config `settings.modes` -- simple CRUD

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
