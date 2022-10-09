import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import EventSearchItem from './EventSearchItem';


function EventSearch() {
    const searchResults = useSelector((store) => store.searchResults.searchResults);


    const [search, setSearch] = useState('');
    const dispatch = useDispatch();

    const submitSearch = (event) => {
        event.preventDefault();
        dispatch({
            type: 'SAGA_SEARCH_EVENTS',
            payload: search
        })
        setSearch('');
    }




    return (
        <>
            <h1>Search</h1>
            <form onSubmit={submitSearch}>
                <input type="text" placeholder='event search' onChange={(event) => setSearch(event.target.value)} />
                <button type="submit">Search</button>
            </form>

            <section>
                <h4>Concert Search Results:</h4>


                {searchResults.map(concert => (

                    <EventSearchItem concert={concert} key={concert.id} />

                ))}
            </section>
        </>
    )
}

export default EventSearch;