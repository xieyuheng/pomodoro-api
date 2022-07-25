# register process

- `/api/register/[token]/verify` -- return verifying by query the token
  - learn redis-om 's API -- https://github.com/redis/redis-om-node
- `/api/register/[token]/verify` -- create user token
- `RegisterVerifying` -- save user token to `localStorage`
- `/api/register/[token]/confirm`
- `/api/register/[token]/revoke`
- `PageLayoutHeader` show `PageLayoutMenu` if there is `user`
- unit test with mock `Mailer`

- be able to send email to users
  - https://nodemailer.com/about

- base `Controller` class for `h3`
  - https://github.com/unjs/h3
  - a way to handle dependency injection
    - redis client should be injected here
      - need to `await` async functions
- `active-record-and-redis` -- well typed

- `components/login/LoginStart`
- `components/login/Login.vue`

- be able to config `settings.modes`
