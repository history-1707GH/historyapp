Meander is an interactive, guided tour application that takes users on a historical journey, directing them such that each experience builds a story.  We found that creating an immersive experience relied on providing quality content, which is curated from queries to the Wikipedia and New York Times APIs to keep users visually and physically a part of their experience.  

It was necessary for Meander to be mobile and to be accessible across multiple platforms. We used components from the Material-Ui library, providing responsive styling for a seamless mobile experience. Additionally we chose to build meander as a Progressive web app which offers increased compatibility, while still having the look and feel of a native app.

Meander is a Fullstack javascript application.  Our backend is built with Node, Express, Postgres, pg and Sequelize. For our front-end, we used React and Redux as our foundation.  These technologies support the scalable, flexible, and responsive experience as users navigate the features of our app and interact with the rich content provided therein.  As users interact with their surroundings, they unlock features that are only available when they are within certain proximity of the target attraction, such as earning points, or leaving a note for future travelers to see.  While at a target attraction, users can experience the history of that location through reading related news articles or listening to the corresponding wikipedia synopsis. 
When they are ready to move onto the next experience, they can choose from locations curated from their current story.

To create an interactive experience, we want to encourage users to physically explore the locations about which they are learning.  In order to unlock features based on geolocation, we used the HTML5 Geo Locaiton API.    We further enhanced the app’s interactivity with augmented reality.  We determined the heading of the user’s camera and guide users to the correct location.
  
We were excited about the idea that a user’s journey would be neither deterministic nor random.  We provided users the option between the two locations with the maximum association.   

http://bit.ly/meanderappvideo
