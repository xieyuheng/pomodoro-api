# register process

- `/api/register/[token]/verify` -- create and return `AccessToken`
- `/api/register/[token]/verify` -- create `User`

- `RegisterVerifying` -- save `AccessToken` to `localStorage`
- `RegisterVerifying` -- save current user to `localStorage`

- auth header by `AccessToken`

- `PageLayoutHeader` show `PageLayoutMenu` if there is current user

- `components/login/LoginStart`
- `components/login/Login.vue`

- be able to config `settings.modes`

- [refactor] base `Controller` class for `h3`
  - https://github.com/unjs/h3
  - a way to handle dependency injection
    - redis client should be injected here
      - need to `await` async functions

- [refactor] `active-record-and-redis` -- well typed
