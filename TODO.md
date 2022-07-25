# register process

- `/api/register/[token]/verify` -- return verifying by query the token
- `/api/register/[token]/verify` -- create user token
- `RegisterVerifying` -- save user token to `localStorage`
- `/api/register/[token]/confirm`
- `/api/register/[token]/revoke`

- `PageLayoutHeader` show `PageLayoutMenu` if there is `user`
- be able to send email to users
  - https://nodemailer.com/about
- be able to config `settings.modes`

# login process

- `components/login/LoginStart`
- `components/login/Login.vue`

# refactor

- base `Controller` class for `h3`
  - https://github.com/unjs/h3
