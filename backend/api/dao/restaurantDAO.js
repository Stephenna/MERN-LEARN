// Step 5 create dao dir;
//& Step 6 
//& 

// create variable to use to store a reference to our db.
let restaurants;

export default class RestaurantsDAO {
    // all async methods. injectDb is the initial way we connect to our db.
    // we call injectDb as soon as server starts. When our servers starts we get a reference from our restaurants db
    static async injectDB(conn){
        if(restaurants) {
            // if this is already filled, return
            return
        }
        try {
            // if it is NOT filled, we are going to point that variable to the restaurants db
            // were awaiting our connection to our db (.env.RESTREVIEWS_NS) with conn.db. We are specifically asking for the restaurants collection w/ .collection.
            restaurants = await conn.db(process.env.RESTREVIEWS_NS).collection("restaurants")
        } catch (e) {
            console.error(

                // if were not able to access db info return error message
                `Unable to establish a collection handle in restaurantsDOA: $(e)`,
            )
        }
    }
    
// what we call when we want to get the list of all the restaurants in the database.
    static async getRestaurants({
        // options we made up for this method.
        // filter is to sort
        filters = null,
        // page number we want
        page = 0,
        // 20 restaurants per page.
        restaurantsPerPage = 20,

    } = {}) {
        let query;
        if(filter){
            if("name" in filters) {
                query = {$text: {$search: filters["name"] } }
            } else if ("cuisine" in filters) {
                query = {"cuisine": {$eq: filters["cuisine"] } }
            } else if ("zipcode" in filters) {
                query = {"address.zipcode": {$eq: filters["zipcode"] } }
            }
        }

        let cursor;
        try {
            cursor = await restaurants
                .find(query)
        } catch (e) {
            console.error(`Unable to find command. ${e}`)
            return { restaurantsList:[], totalNumRestaurants: 0}
        }

        const displayCursor = cursor.limit(restaurantsPerPage).skip(restaurantsPerPage * page)

        try {
            const restaurantsList = await displayCursor.toArray()
            // const totalNumRestaurants = page === 0 ?
        }
    }

   

}