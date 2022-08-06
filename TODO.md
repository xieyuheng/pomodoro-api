- rename EmailRegisterController to RegisterController
- rename EmailLoginController to LoginController

# features

- `BaseController` -- `auth` instead of `currentUser`

- `PomodoroController` -- get
- `PomodoroController` -- put

- `settings` in `PomodoroJson`

- `/settings/:username` -- put
- `/settings/:username` -- get

# deploy

- deploy to `web@ro-aws-1`
- setup local redis config and data.dump
- use cf tunnel

# learn

- [learn] express middleware

  https://expressjs.com/en/guide/using-middleware.html
  https://expressjs.com/en/guide/writing-middleware.html
  https://expressjs.com/en/guide/error-handling.html

- [refactor] `Router` support alist as args -- for middleware

- [learn] express session
- [refactor] relation between `Server` and `App`

# refactor

- [maybe] `Repo` -- rename `find` and `findOrFail` to `get` and `getOrFail`

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
