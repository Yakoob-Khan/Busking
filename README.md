# Project Name

![Team Photo](Insert a Team Photo URL here)
[*how?*](https://help.github.com/articles/about-readmes/#relative-links-and-image-paths-in-readme-files)

TODO: short project description, some sample screenshots or mockups

## Architecture
### API
- Maps
	- Some Maps API
	- READ/WRITE => Longitude/Latitude
- Payments API (Plaid?)
	- READ => Payment Confirmation
	- WRITE => User sends information
### Database
 - Events
	 - Time
	 - Longitude, Latitude
	 - Description
	 - Title
- Profiles
	- Public
		- Name
		- List of events
			- Past
			- Future
		- Followers
		- Join Date
	- Private
		- Location (Longitude and Latitude)
		- Distance willing to travel
		- Receipts
### Frontend
- Signup/Login
	- Passport + Facebook
- Map View
	- User can see all events nearby
- Home page
	- CTA => CREATE AN EVENT
	- Profile
	- Events nearby
	- Feed
	- Filter events
- Specific Event
	- Details
	- Distance
- I'm going/I'm there
	- Renders different information based on whether user is planning to go or is already there
		- distance to event
		- time to event
	- Payments
	- Communicate with others
	- A lot of fun stuff such as stories for example
	- Videos from the event
- Settings
	- Distance willing to travel
- Create Event Form
TODO:  descriptions of code organization and tools and libraries used

## Setup

TODO: how to get the project dev environment up and running, npm install etc

## Deployment

TODO: how to deploy the project

## Authors

Rafi Khaled 

Xingran Zhuang 

Tianxing Dai 

Chikezie Onungwa 

Yakoob Khan 

## Acknowledgments
