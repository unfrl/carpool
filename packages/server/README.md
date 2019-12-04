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

## Carpool information restrictions

### Un-authenticated

-   Can see name, destination, date, description, and metadata
-   Metadata: number of drivers and number of available seats

### Authenticated

-   Can see list of drivers and their details
-   Can join as a driver or as a passenger

### Passenger

-   Same as authenticated and can see which driver their a passenger of

### Driver

-   Can see the drivers and their details, and can see the details of their passengers (but not details of other drivers' passengers)

### Creator

-   Can see list of drivers, their details, and passengers and their details

---

### Rooms

-   Unauthenticated: can join the carpool room for changes _only_ to the carpool DTO
-   Authenticated/passenger: can join the carpool drivers room to see changes just to the drivers (not their passengers)
-   Driver: each driver has their own room in a given carpool, referenced by the driver's GUID - this room shows passenger updates
-   Creator: global channel for a carpool room that receives **any** changes made to it

### Updates

-   Carpool data changes --> update all in carpool room
-   When a driver is added or updated --> broadcast change to authenticated room
-   When a passenger is added/updated --> broadcast change to drivers & creator room
