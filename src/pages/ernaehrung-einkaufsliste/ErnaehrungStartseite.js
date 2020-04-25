import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
function Ernaehrungstartseite() {

    const [entrySearch, setEntrySearch] = useState([{
        essen: '',

    }])
    const [data, setData] = useState({ hits: [] });
    const [search, setSearch] = useState(false);

    async function searchMeal() {
        const YOUR_APP_ID = '6ff3b59b';
        const YOUR_APP_KEY = '53f9547355139ebdda5640fee4c27c90';
        let ESSEN = entrySearch.essen;
        const result = await axios(`https://api.edamam.com/search?q=${ESSEN}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&from=0&to=10`);
        setData(result.data)
        console.log(data, "LÖLÖLÖL")
        console.log(result.data, "LALALA")
          };  

    function getInput(e) {
        const { name, value } = e.target;
        setEntrySearch(entrySearch => ({ ...entrySearch, [name]: value }));
        console.log("CHANGES: ", entrySearch.essen);
       // setSearch(false)
    }

    function handleSubmit(e) {
        searchMeal();
        setSearch(true)
        console.log(data, "TEST");
    }

    return (

        <>
            <nav>
                <NavLink to="/loggedIn" exact>Startseite</NavLink> | <NavLink to="/eat">Ernährungs Übersicht</NavLink> | <NavLink to="/shoppinglist">Einkaufsliste</NavLink> | <NavLink to="/sport">Sport</NavLink> | <NavLink to="/settings">Option</NavLink> | <NavLink to="/" onClick={sessionStorage.clear()}>LogOut</NavLink>
            </nav>
            <br />
            <div>
                Das ist die Ernährungs Startseite WhoopWhoop!
            </div>
            <input type="text" placeholder="Search..." name="essen" onChange={getInput}  />
            <button onClick={handleSubmit}>
                Search
            </button >
            <div>
                {search &&
                    <ul>
                        {data.hits.map(item => (
                            <li key={item.objectID}>
                              <a href="">  {`${item.recipe.label} || ${Math.floor(item.recipe.calories/ item.recipe.yield)} kCal pro Mahlzeit`} </a>
                            </li>
                        ))}
                    </ul>
                }
            </div>
        </>
    );
}


export default Ernaehrungstartseite;