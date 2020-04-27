import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
function Ernaehrungstartseite() {

    const [entrySearch, setEntrySearch] = useState([{
        essen: '',

    }])
    const [data, setData] = useState({ hits: [] });
    const [search, setSearch] = useState(false);

    const [healthFilter, setHealthFilter] = useState({
      tagValue: ''
    })

    const [searches, setSearches] = useState([]) // für string concat später
    const [checkboxState, setCheckboxState] = useState([]); //leeres Array


    useEffect(() => {
      let checkboxState = [
        {id: 'vegan', name: "tagValue"},  //wahlweise kann man stattdessen eigenständige isChecked-Values einbauen und auf diese checken
        {id: 'sugar-conscious', name: "tagValue"},
        {id: 'low-carb', name: "tagValue"}
      ];

      setCheckboxState(
        checkboxState.map(d => {
          return {
            select: false,
            id: d.id,
            name: d.name
          };
        })
      );
    }, []);

//ins handleSubmit schmeißen;
// VERALTET?
    // function getCheckboxValue(e) {
    //   let name = e.target.name;
    //   let value = e.target.id;
    //   let arr1 = [];
    //
    //   //let string = `&health=${value}`;
    //   // console.log(string);
    //   //setChecked(checked => !checked);
    //   console.log("before IF", checked);
    //   if(checked) {
    //     console.log("in IF", checked);
    //     setHealthFilter(healthFilter => ({ ...healthFilter, [name]: value}));
    //     setSearches(searches => searches.concat(value))
    //     console.log("SEARCHES: ", searches);
    //   } else {
    //     console.log("in ELSE", checked);
    //     setHealthFilter(healthFilter => ({ ...healthFilter, [name]: ''}));
    //   }
    //   console.log(healthFilter);
    // }

    async function searchMeal() {
        const YOUR_APP_ID = '6ff3b59b';
        const YOUR_APP_KEY = '53f9547355139ebdda5640fee4c27c90';
        let ESSEN = entrySearch.essen;
        let HEALTH_LABEL_STRING = `&health=${healthFilter.tagValue}`;
        const result = await axios(`https://api.edamam.com/search?q=${ESSEN}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&from=0&to=10${HEALTH_LABEL_STRING}`);
        setData(result.data);
        console.log(data, "LÖLÖLÖL")
        console.log(result.data, "LALALA")
          };

    function getInput(e) {
        const { name, value } = e.target;
        setEntrySearch(entrySearch => ({ ...entrySearch, [name]: value }));
        console.log("CHANGES: ", entrySearch.essen);
        console.log(healthFilter);
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
            {checkboxState.map((d, i) => (
              <div key={d, i}>
              {/* auslagern */}
              <input onChange={e => {
                let checked = e.target.checked;
                setCheckboxState(
                  checkboxState.map(data => {
                    if (d.id === data.id) {
                      data.select = checked;
                    }
                    console.log(data);
                    return data;
                  })
                );
              }}
              type="checkbox" checked={d.select}/>
              </div>
              ))}

            {/* <button id="vegan" name="tagValue" value={checked} onClick={getCheckboxValue}>text</button>
             <button id="sugar-conscious" name="tagValuessss" value={checked} onClick={getCheckboxValue}>text2</button> */}

            <input type="text" placeholder="Search..." name="essen" onChange={getInput}  />
            <button onClick={handleSubmit}>
                Search
            </button >
            <div>
                {search &&
                    <ul>
                        {data.hits.map(item => (
                            <li key={item.objectID}>
                              <a href="">
                                <p>{`${item.recipe.healthLabels}`}</p>
                                <img src={item.recipe.image} alt="filler" />
                                {`${item.recipe.label} || ${Math.floor(item.recipe.calories/ item.recipe.yield)} kCal pro Mahlzeit`}
                                </a>
                            </li>
                        ))}
                    </ul>
                }
            </div>
        </>
    );
}


export default Ernaehrungstartseite;
