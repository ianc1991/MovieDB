# MovieDB

A current work in progress MERN project using the default MongoDB Atlas Mflix database. 
### Current capabilities

* Bootstrap components are used to get the initial layout of the website done.
* While the code includes logic for two seperate Node servers, I've merged them into one for hosting simplicity since this is more of a portfolio project. One server handles getting data for movies as well as comments. The other server handles user registration and login authorization. JSON Web Tokens and Bcrypt are used for authorization. Passwords are hashed and salted on the database.
* Search bar to search for movie titles.
* Search results are displayed in a list.
* When a movie is clicked, it displays details about that movie, including user comments.


### Future Update Plans

* More validation for registering users.
* More fleshed out comment system(reply to comments, edit/delete comments, vote on comments).
* A voting system for movies, as opposed to using the IMDb stats provided in the Mflix database.
* Add more elements to the home page.
* Overall more styling.
