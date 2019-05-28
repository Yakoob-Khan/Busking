# Busking

A decentralized platform that empowers street performers to publicize their musical events. This democratizes information so that more people can support up-and-coming artists in their region.

## Tech Stack
- React.js, Redux, Node.js/Express, MongoDB.

## Architecture
### API's used
- **Google Maps API**
	- Some Maps API
	- READ/WRITE => Longitude/Latitude
- **Stripe Connects API**
	- we used the Stripe Connects API to build the payments infrastructure for our app. 
	- From a user flow perspective, users can **directly** receive tips from the public by either linking their own Stripe account into our platform or going through the Stripe Connect OAuth flow to create their Stripe accounts. Then, they will be **redirected** to our landing page to see the full list of events.
	- **LINKING STRIPE:** A user can go to my profile and click **Stripe Connect**, which will re-directed them to Stripe Oauth flow. For testing purposes, you can just sign in to stripe and click `Skip the account form`, as you don't want to spend `~30 mins` to fill up a form. Clicking `Skip the account form` will redirect you back to the home page!


## Frontend 
###Home
We have a landing page that displays all the events, has a search bar to look up a particular event, toggle to map view, filter events! Users can also toggle into map view and we use **GEO-LOCATION API** to show the users the events that are nearby to them.
 	

###Create Event
We render a beautiful form for the users to enter their newly created event.

###Events
The following features are associate with each event: 

	 1. Time
	 2. Longitude, Latitude
	 3. Description
	 4. Title
	 5. Average User Rating
	 6. comments
	 7. attendees
	 8. Stripe Id (to pay directly to the users)

### Profiles
		- Each user has profile page that displays the following information:
		1. Their average ratings from their peers
		2. A list of people they follow
		3. A list of people they are following.
		4. The number of events they attended.
		5. Users can also see a list of events that they hosted and attended.
	
### Sign up
We used Facebook authentication to sign users into a platform. We used the `Facebook Strategy` using Passport.js and use sessions so that when users refresh the page, they are still logged in!


## Setup

Clone both the front-end and back-end and run `yarn` to install all the project dependencies. Make sure you have a mongo process running in another terminal in the background. Then run `yarn start` in the front-end, `yarn-dev` in the backend, to load the run the project locally.

## Deployment

We deployed the both the front-end and back-end using **Heruko**. See our deployed project at [Busker](https://busking.surge.sh/)

## Documented Bugs
1. When we use the [react-datetime-picker](http://projects.wojtekmaj.pl/react-datetime-picker) library, the creators of the library did not add input validation to their code. This allows users to enter times like **4:0000 pm** or **5:001 pm**, a bunch of trailing zeros that have no meaning. Since we did not write this library, its impossible for us to change it without issuing a pull request to the creators of this library. 
2. Sometimes, we get a React`mapCenter` console.log warning in the browser. This problem is occuring because `react-google-maps` prop name is called `center` whereas google browser expects the prop name to be called `mapCenter`. Other than issuing a pull request to the creators of this library, there is little else to do. Thankfully, functionally everything works!


## Authors

Rafi Khaled '20, Xingran Zhuang '20 , Tianxing Dai '20, Chikezie Onungwa'20, Yakoob Khan '21

## Acknowledgments
We have to thank Tim, our TA and the entire cs52 team for organizing such an amazing class and helping us make this project a success and something that we are proud to display to others.
