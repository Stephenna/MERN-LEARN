//& 3
//& Connect to database and start the server
import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import RestaurantsDAO from "./dao/restaurantDAO.js"

dotenv.config()

const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 8000

MongoClient.connect(
    process.env.RESTREVIEWS_DB_URI,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
        useNewUrlParser: true
    }
)
.catch(err => {
    console.error(err.stack)
    process.exit(1)
}).then(async client => {
    await RestaurantsDAO.injectDB(client)
    app.listen(port, () =>{
        console.log(`listening on port ${port}`)
    })
})

// & NOW WE HAVE TO CREATE OUR ROUTES
