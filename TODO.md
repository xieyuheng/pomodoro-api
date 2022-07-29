# learn

- learn nuxt's module API -- why needed?

- learn about nuxt/content

- [play] redis sorted set
- [play] redis list
- [play] redis set

# backend

- `AccessToken`

- `/api/register/[token]/verify` -- create `User`
- `/api/register/[token]/verify` -- create and return `AccessToken`

- use `server/middleware` to implement auth header by `AccessToken`

# frontend

- `RegisterVerifying` -- save `AccessToken` to `localStorage`
- `RegisterVerifying` -- save current user to `localStorage`

- `components/login/LoginStart`
- `components/login/Login.vue`

- be able to config `settings.modes`

- be able to save `tasks`

- `PageLayoutHeader` show `PageLayoutMenu` if there is current user

# refactor

- [upstream] use `schema.keys()`

- use `LIMIT 0 10` to implement `firstWhere`

- be able to config `Repository` log behavior

- `Repository` -- migration be able to `dropIndex`

  - FT.DROPINDEX myIdx
  - FT.DROPINDEX myIdx DD

- `Repository` -- api about auto-complete
  - https://redis.io/commands/ft.sugadd/
  - https://redis.io/commands/ft.sugget/

- `Repository` -- `createIndex` from `ty.Schema`

- `Repository` -- `where`

  - `Query` expression format to redis search query
  - learn from laravel Eloquent API
    - https://laravel.com/docs/9.x/eloquent#retrieving-models
  - learn from laravel Query Builder
    - https://laravel.com/docs/9.x/queries
  - `where().first()`
  - `where().firstOrFail()`
  - `where().all()`

- abstract `Repository` and `RedisRepository`
- abstract `Repository` and `FiRepository`
