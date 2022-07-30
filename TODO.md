# backend

# frontend

- `PageLayoutMenu` with `Logout` button
- `PageLayoutMenu` show different menu items depends on current user or not
- `PageLayoutMenuMobile` show different menu items depends on current user or not

- `User` keep `username` and `email` unique

- use cookie instead of `localStorage` for ssr

- `components/login/LoginStart`
- `components/login/Login.vue`

- be able to config `settings.modes`

- be able to save `tasks`

# refactor

- `Repository` -- `createIndex` to side effect to `Model`
- `Repository` -- query by schema

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

  - https://redis.io/commands/ft.create/
  - https://redis.io/docs/stack/search/design/indexing/

- `Repository` -- `where`

  - `Query` expression format to redis search query
  - learn from laravel Eloquent API
    - https://laravel.com/docs/9.x/eloquent#retrieving-models
  - learn from laravel Query Builder
    - https://laravel.com/docs/9.x/queries
    - https://redis.io/docs/stack/search/reference/query_syntax/
  - `where().first()`
  - `where().firstOrFail()`
  - `where().all()`

- abstract `Repository` and `RedisRepository`
- abstract `Repository` and `FiRepository`

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
