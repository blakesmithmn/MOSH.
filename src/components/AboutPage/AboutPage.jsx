import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div>
        <h1>Technologies Used:</h1>
        <ul>
          <li>React</li>
          <li>Material-UI</li>
          <li>JavaScript</li>
          <li>Node.js</li>
          <li>Express</li>
          <li>Redux / Redux-Saga</li>
          <li>SQL</li>
          <li>3rd Party API's:
            <ul>
              <li>SeatGeek API for Event Details and Ticket Link / Pricing</li>
              <li>TicketMaster API for Social Links</li>
            </ul>
          </li>
          <li>SweetAlerts</li>
          <li>HTML / CSS</li>
        </ul>
        <h2>Challenges / Next Steps:</h2>
        <ul>Challenges:
          <li>Dealing with multiple large API's to fill the niche data needed for the app</li>
          <li>Creating a responsive product that can be used at home and on the go</li>
        </ul>
        <ul>Next Steps:
          <li>Creating a function where users can 'Friend' someone and view what events they are attending</li>
          <li>A recommended list of upcoming events on the home view per user</li>
        </ul>

        <h2>Special Thanks:</h2>
        <p>Thanks to the L'Engle cohort, our instructor Matt, and Caffeine for making this all possible.</p>
      </div>
    </div>
  );
}

export default AboutPage;
