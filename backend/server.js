//& 1
//& Where we configure express server
//& catch cors middleware
import express from "express"
import cors from "cors"

// we have to create this component below
import restaurants from "./api/restaurant.route.js"


// accessing express
const app = express()

//& Initializing what express will be using w/ .use():
app.use(cors()) //to get our middleware

app.use(express.json()) // our server can accept json in the body of the request (body parser is now included in express). 

// specifying initial routes. THE INITIAL URL:
app.use("/api/v1/restaurants", restaurants) // EX: localhost:300/api/v1/restaurants, we grab the rest of the routes from our restaurants file included above.

app.use("*", (req, res)=>{
    res.status(404).json({error: "not found"})
}) //if accessing a page that does not exist. "*" means wildcard.



//& export app as a module
export default app;
// we will be able to export this module into the file that accesses as database
// the file that gets the server running

// got to step 2 create .env file