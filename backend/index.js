//& 3
//& Connect to database and start the server

import app from "/Users/sjc/MERN/restaurant-reviews/backend/server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"



// configure dotenv
dotenv.config()
 
// get access to mongo client
const MongoClient = mongodb.MongoClient

// set port 
const port = process.env.PORT || 8000

// connect to database
MongoClient.connect(
    // pass db uri
    process.env.RESTREVIEWS_DB_URI,
    {
        // how many people can connect at once:
        maxPoolSize: 50,

        // specifies a time limit for the write concern
        wtimeoutMS: 2500,

        // this allows to fall back to old parsers if we find a bug in a new parser
        useNewUrlParser: true
        //! A parser is a compiler or interpreter component that breaks data into smaller elements for easy translation into another language.
    }
)

.catch(err => {
    console.error(err.stack)
    process.exit(1)
}).then(async client => {
    app.listen(port, () =>{
        console.log(`listening on port ${port}`)
    })
})

// & NOW WE HAVE TO CREATE OUR ROUTES
