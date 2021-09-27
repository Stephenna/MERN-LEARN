Step 1:
    1A. create server.js
    2b. configure express and middleware

Step 2:
    1A. Create .env and .gitignore
    2B. Add mongoDB connection code.
    3C. Add PORT key.

Step 3: 
    1A. Create index.js file
    2B. Connect to server

Step 4: 
    create routes

Step 5:
    create dao(data access object) directory in API directory 

Step 6: Create Data access file
    create var to store a reference to our db

    export class. 
    The class contains a few methods that are all async methods.

    injectDb() how to initially connect to db. call this meth as soon as server starts. as it starts we get a ref to our db.

    if var restaurants value is filled with a reference we return. Else we pass a reference to the restaurants variable.

    we trail .connection to the reference to specifically refer to the collection of restaurants.

    getRest to get all rest. 
    
    first line after cursor variable declaration will try to find all the restaurants we are querying. We are going to catch empty queries and return all restaurants. 

    if there is no error, we are going to limit restaurants per page and then to get page number we skip from the beginning to the whatever page number were at.

    then we set restList list to an array and then we return the array. 

    unless we have an error then we return that shit.

steps 7.
    import restDOA
    place right after we connect to database but before we start our server, inside the .then() meth we are going to call injectDB(pass in the client.) This is how we get our inital ref to the rest in the database. Now we create the controller to the route file will use to access the DAO file.

Step 8.
    inside rest.route.js 
    the controller file is going to be what the route uses. 
    we import (still have to create) import RestaurantsCtrl from "./restaurants.controller.js".
    then we update our router.route get with RestaurantsCtrl.apiGetRestaurants. we are going to get whats return from the route, which is the RestaurantsCtrl file and the method.
     
Step 9:
    We create restaurants.controller.js file inside of api directory.
    
    first we import RestDao file.
    We create restaurantsController file.
    There will be a few methods.
    When apiGetRestaurants is called thru a url there can be a query string. Query string is how we specify certain parameters.// restaurantsPerPage is a query string. We set restperpage var to equal whatever value passed thru the query of a url. with the ternary operater, first we check if it exist. if it exist, we convert into an integer, if not we are going to default to 20.
    page variable: if we passed in a page number thru the url, we are going to return it as a parsed integer or return it as 0.
    we call the getRestaurants() we've created earlier in this file. We pass in the filters, the page, and the restaurants per page. Its goings to return restaurantsList, and totalNumRestaurants. We create a response to send when this API url is called. We respond with the restaurantsList, page, filters, restaurantsPerPage, totalNumRestaurants. We are going to send a json response to whoever called this URL 
