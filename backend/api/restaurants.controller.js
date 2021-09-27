//& Step 9 
import RestaurantsDAO from "../dao/restaurantDAO.js";

export default class RestaurantsController {
    static async apiGetRestaurants(req, res, next) {
        const restaurantsPerPage = req.query.restaurantsPerPage ? parseInt(req.query.restaurantsPerPage, 10) : 20;

        const page = req.query.page ? parseInt(req.query.page, 10) : 0

        let filters = {}
        if(req.query.cuisine){
            filters.cuisine = req.query.cuisine;
        } else if (req.query.zipcode){
            filters.zipcode = req.query.zipcode;
        } else if (req.query.name) {
            filters.name = req.query.name;
        }

      const { restaurantsList, totalNumRestaurants } = await RestaurantsDAO.getRestaurants({
          filters,
          page,
          restaurantsPerPage,
      })

      let response = {
          restaurants: restaurantsList,
          page: page,
          filters: filters,
          entries_per_page: restaurantsPerPage,
          total_results: totalNumRestaurants,
      }
      res.json(response)
    }
}

// restaurantsPerPage is a query string. We set restperpage var to equal whatever value passed thru the query of a url. with the ternary operater, first we check if it exist. if it exist, we convert into an integer, if not we are going to default to 20.
// page variable: if we passed in a page number thru the url, we are going to return it as a parsed integer or return it as 0.
// we call the getRestaurants() we've created earlier in this file. We pass in the filters, the page, and the restaurants per page. Its goings to return restaurantsList, and totalNumRestaurants. We create a response to send when this API url is called. We respond with the restaurantsList, page, filters, restaurantsPerPage, totalNumRestaurants. We are going to send a json response to whoever called this URL