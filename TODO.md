# data layer

- naming convention of file and directory

  - re-org framework by topics `mail/Mailer`?

- learn more about redis search
- learn more about mono repo

- [play] redis sorted set
- [play] redis list
- [play] redis set

- be able to config `Repository` log behavior

- `Repository` -- migration be able to `dropIndex`

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

# backend

- `AccessToken`

- `/api/register/[token]/verify` -- create `User`
- `/api/register/[token]/verify` -- create and return `AccessToken`

- use `server/middleware` to implement auth header by `AccessToken`

# refactor

- [upstream] use `schema.keys()`

# frontend

- `RegisterVerifying` -- save `AccessToken` to `localStorage`
- `RegisterVerifying` -- save current user to `localStorage`

- `components/login/LoginStart`
- `components/login/Login.vue`

- be able to config `settings.modes`

- be able to save `tasks`

- `PageLayoutHeader` show `PageLayoutMenu` if there is current user
