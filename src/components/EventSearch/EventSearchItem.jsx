import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';



function EventSearchItem({ concert }) {

    const [eventID, setEventID] = useState(0);
    const dispatch = useDispatch();

    const requestDetails = (concert) => {
        event.preventDefault();

        setEventID(concert)
        console.log(eventID);
        dispatch({
            type: 'SAGA_FETCH_DETAILS',
            payload: eventID
        })
    }

    return (
        <div key={concert.id}>
            <h1>{concert.title}</h1>
            <p>Concert Time / Date: {concert.datetime_local}</p>
            <img src={concert.performers[0].image} alt="" />
            <div>
                <a href={concert.url}>Tickets</a>
                <p>{concert.venue.name}</p>
                <p>{concert.venue.address} {concert.venue.extended_address}</p>
            </div>
            <div>
                <h4>TICKET DETAILS:</h4>
                <p>Average Ticket Price:{concert.stats.average_price}</p>
                <p>Lowest Ticket Price:{concert.stats.lowest_price}</p>
                <p>Highest Ticket Price:{concert.stats.highest_price}</p>

                <p>CONCERT ID for DETAILS: {concert.id}</p>
                <p>ARTIST ID for DETAILS / EVENTUAL SPOTIFY LINK: {concert.performers[0].id}</p>

            </div>
            <div>
                <button onClick={(event) => { requestDetails(concert.id) }}>DETAILS</button>
                <button>ADD EVENT</button>
            </div>

            <h2>RECOMMENDATIONS REQUESTS COULD BE DOPE FOR HOME PAGE</h2>
        </div>
    )
}

export default EventSearchItem;