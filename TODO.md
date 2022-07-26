- [refactor] `Model` -- well typed active record and redis

- `AccessToken`

- `/api/register/[token]/verify` -- create `User`
- `/api/register/[token]/verify` -- create and return `AccessToken`

- `RegisterVerifying` -- save `AccessToken` to `localStorage`
- `RegisterVerifying` -- save current user to `localStorage`

- use `server/middleware` to implement auth header by `AccessToken`

- `PageLayoutHeader` show `PageLayoutMenu` if there is current user

- `components/login/LoginStart`
- `components/login/Login.vue`

- be able to config `settings.modes`

- be able to save `tasks`
