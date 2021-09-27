//& 1
//& we configure express server
//& catch cors middleware
import express from "express"
import cors from "cors"
import restaurants from "./api/restaurant.route.js"


const app = express()

app.use(cors())
app.use(express.json())
app.use("/api/v1/restaurants", restaurants)
app.use("*", (req, res)=>{
    res.status(404).json({error: "not found"})
})



//& export app as a module
export default app;
// we will be able to export this module into the file that accesses as database
// the file that gets the server running

//& got to step 2 create .env file