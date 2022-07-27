# data layer

- [play] redis sorted set
- [play] redis list
- [play] redis set

- move `createIndex` to `Repository`
- use `sendCommand` to `createIndex`

- `Repository` -- `allWhere()`

- `Repository` -- `where().first()` & `where().firstOrFail()`

- `Repository` -- `createIndex` from `ty.Schema`

- `Repository` -- `where`

  - learn from laravel Eloquent API
    - https://laravel.com/docs/9.x/eloquent#retrieving-models
  - learn from laravel Query Builder
    - https://laravel.com/docs/9.x/queries

- replace `redis-om-node` by our `Model` class

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
