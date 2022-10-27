
  
  
  
  
  
  
  
  
  

![REPO SIZE](https://img.shields.io/github/repo-size/blakesmithmn/MOSH.?style=flat-square)

![TOP_LANGUAGE](https://img.shields.io/github/languages/top/blakesmithmn/MOSH.?style=flat-square)

![FORKS](https://img.shields.io/github/forks/blakesmithmn/MOSH.?style=social)

  
  

# MOSH.

  

_Duration: Two Week Sprint_

  

MOSH. is a social platform built to connect users based on shared music interest - in an effort to help people find their next concert going companion. Making friends as an adult is tough - it's even harder to find the time to do things  together! Attending concerts alone is never quite as fun ... MOSH. is here to help!

I built this app to be responsive for Mobile or Desktop view - anticipating a users needs to use the product in different environments. 

This project was built in its entirety over the course of two weeks as a part of [Prime Digital Academy](www.primeacademy.io).

  

## Approach

  

With this project being a much larger workload than previous projects in my experience, I started the development process through thorough planning. We spend a good chunk of time scoping the project, and setting up a timeline.

 As a representation of the planning spent on this project - I have included the scope document. This process involved spending time considering user flow, component structure, and design potential for the application. This experience also involved setting a timeline for certain features and was an interesting first venture into estimating development time. 
 
[Scope Document with Wireframes](https://docs.google.com/document/d/1pbcPLlckRQuP1xbaCUsxnUh4Vuuz3gLM1_c-j4q54FA/edit?usp=sharing)
  

If you would like to see a draft of the database structure created during scoping - I have included the relevant ERD. This shows how the tables interact with one another and gives context to functions within the program.

[Entity-Relationship Diagram](https://app.dbdesigner.net/designer/schema/563565)

  

## Getting Started

  

### Prerequisites

- React.js *(built on version 17.0.2)*

- Keys for SeatGeek & TicketMaster API's

- DotEnv

-  [Node.js](https://nodejs.org/en/)

- Axios

- Redux

- Redux-Saga

-  [Material.UI](https://mui.com)

- Express

- Body-Parser

- 'PG'

- Database Manager

  

### Installation

  

Using your package manager - install the dependencies

```

$ ~ npm install

```

  

In your database manager - use the provided database.sql file to create the necessary tables for this project.

  
  

With your database set up - start the server.

```

$ ~ npm run server

```

With the server running - open another terminal window and start your client.

Navigate to http://localhost:3000 if the run client script doesn't automatically open the application.

```

$ ~ npm run client

```

  

## Deployment

  

Add additional notes about how to deploy this on a live system

  

## Built With

  

*  [React.js](http://www.dropwizard.io/1.0.2/docs/)

*  [Material-UI](https://maven.apache.org/) - components and styling

*  [SeatGeek API](https://platform.seatgeek.com) - Used to generate and search events / event details.

*  [TicketMaster API](https://developer.ticketmaster.com/products-and-docs/apis/getting-started/) - Used to generate Social Links

  
  
  
  

## Acknowledgments

  

* Hat tip to anyone whose code was used

* Inspiration

* etc

  

## Screen Shots

All screenshots available in the [Wireframes](https://github.com/blakesmithmn/weekend-movie-sagas/tree/main/wireframes)

![](wireframe.png)

  
  

## Usage

This application is meant to serve as a tool for users to find Concerts in their local vicinity and interact with other users:

1. Using the provided movies on the home page - `click` the movie of your choice to see the details.

2. Once done, navigate back to the home page using either the navigation bar - or the provided `back` button.

3. If you wish to add your own movie - navigate to `search` using the provided navigation bar.

4. In the search form - enter the movie title to search the Movie Database API.

5. Use the `Add to Favorites` button to add the movie of your choice to the Movielist!

6. If you wish to share a movie with your friends - the detail view of each movie should link them directly!

  
  

## Developer Notes

  

Given the opportunity to revisit this project - I would love to expand the social capabilities of the app, allowing users to 'Add Friends' as well as 'Search Friends'.

  

On top of that, I would like to implement functionality to recommend events based on a users history, as well as their friends activity on the platform.

  
  

## Acknowledgement

Thanks to [Prime Digital Academy](www.primeacademy.io) who equipped and helped me to make this application a reality.

  

Thanks to [SeatGeek](https://platform.seatgeek.com) whose API supplied information for multiple parts of this application, including the majority of event details and the ticketing information.

  

Thanks to [TicketMaster](https://developer.ticketmaster.com/products-and-docs/apis/getting-started/) for providing access to their API - which supplied information for multiple parts of this application, including the social links section allowing for an embedded Spotify web player.