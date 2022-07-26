# register process

- be able to send email to users

- `/api/register/[token]/verify` -- create user token
- `RegisterVerifying` -- save user token to `localStorage`
- `PageLayoutHeader` show `PageLayoutMenu` if there is `user`

- `components/login/LoginStart`
- `components/login/Login.vue`

- be able to config `settings.modes`

- [refactor] base `Controller` class for `h3`
  - https://github.com/unjs/h3
  - a way to handle dependency injection
    - redis client should be injected here
      - need to `await` async functions

- [refactor] `active-record-and-redis` -- well typed
