# data layer

- [play] redis hash
- [play] redis list
- [play] redis set
- [play] redis sorted set

- `Repository` -- `get(id)`
- `Repository` -- `put(id, json)`
- `Repository` -- `delete(id)`

- `Model` -- `expire`

- [upstream] use `schema.keys()`

- replace `redis-om-node` by our `Model` class

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
