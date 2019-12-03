# Un-authenticated

-   Can see name, destination, date, description, and metadata
-   Metadata: number of drivers and number of available seats

# Authenticated

-   Can see list of drivers and their details
-   Can join as a driver or as a passenger

# Passenger

-   Same as authenticated and can see which driver their a passenger of

# Driver

-   Can see the drivers and their details, and can see the details of their passengers (but not details of other drivers' passengers)

# Creator

-   Can see list of drivers, their details, and passengers and their details

---

# Rooms

-   Unauthenticated: can join the carpool room for changes _only_ to the carpool DTO
-   Authenticated/passenger: can join the carpool drivers room to see changes just to the drivers (not their passengers)
-   Driver: each driver has their own room in a given carpool, referenced by the driver's GUID - this room shows passenger updates
-   Creator: global channel for a carpool room that receives **any** changes made to it

# updates

-   Carpool data changes --> update all in carpool room
-   When a driver is added or updated --> broadcast change to authenticated room
-   When a passenger is added/updated --> broadcast change to drivers & creator room
