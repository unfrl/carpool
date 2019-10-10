<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## Carpool Server Configuration

The server requires a postgres database, redis instance, and email credentials to be fully functional. All of these can be configured via environment variables:

| Environment Variable |   Default   |                                                                                                                                                                                                  Description |
| -------------------- | :---------: | -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| DB_HOST              |  localhost  |                                                                                                                                                                    The host address of the postgres instance |
| DB_PORT              |    5432     |                                                                                                                                                                The port used by the target postgres instance |
| DB_USERNAME          |    local    |                                                                                                                                                            The user used to connect to the postgres instance |
| DB_PASSWORD          |    local    |                                                                                                                          The password used to connect to the postgres instance (**dont** use the default...) |
| DB_NAME              |   carpool   |                                                                                                                             The name of the database used by the carpool server within the postgres instance |
| AUTH_SECRET          | supersecret |                                                                                                                 The secret used to sign JWT tokens (**dont** use the default, use `ssh-keygen` or something) |
| AUTH_SALT_OR_ROUNDS  |     10      |                                                                                                                                                   The number of rounds used by bcrypt when generating a hash |
| EMAIL_CONNECTION_URL |     NA      | Should look something like `smtps://angrykoolaidman@gmail.com:<password>@smtp.gmail.com` info [here](https://nodemailer.com/usage/using-gmail/) gmail info [here](https://nodemailer.com/usage/using-gmail/) |
| NODE_ENV             | development |                                                                                                                                     The deployment environment, expected to be `development` or `production` |
| REDIS_HOST           |  localhost  |                                                                                                                                                                       The host address of the redis instance |
| REDIS_PORT           |    6379     |                                                                                                                                                                   The port used by the target redis instance |
