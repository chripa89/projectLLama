import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
function Ernaehrungstartseite() {

    const [entrySearch, setEntrySearch] = useState([{
        essen: ''
    }])
    const [data, setData] = useState({ hits: [] });
    const [search, setSearch] = useState(false);
    const [checkboxState, setCheckboxState] = useState([]); //leeres Array
    const [stringConcat, setStringConcat] = useState([]);
    const [globalString, setGlobalString] = useState('');

    useEffect(() => {
      let checkboxState = [
        {id: 'vegan', name: "tagValue"},
        {id: 'sugar-conscious', name: "tagValue"},
        {id: 'low-carb', name: "tagValue"}
      ];
      setCheckboxState(
        checkboxState.map(data => {
          return {
            select: false,
            id: data.id,
            name: data.name
          };
        })
      );
    }, []);

    function getTagValue(e) {
      let checked = e.target.checked;

      setCheckboxState(
        checkboxState.map(data => {
          if(e.target.id == data.id) {
            data.select = checked;

            if(checked === true) {
              if (stringConcat.includes(data.id) == false) {
                setStringConcat(stringConcat => stringConcat.concat(data.id));
              }
            } else {
              let result = stringConcat.filter(el => el !== data.id);

              if (result) {
                setStringConcat(result);
              }
            }
          }
          return data;
        })
      );
    }

    function concatenateString() {
      let theStringingBegin = "&health=";
      theStringingBegin = theStringingBegin.concat(stringConcat.join("&health="));
      setGlobalString(theStringingBegin);
  }

    async function searchMeal() {
        const YOUR_APP_ID = '6ff3b59b';
        const YOUR_APP_KEY = '53f9547355139ebdda5640fee4c27c90';
        let ESSEN = entrySearch.essen;
        const result = await axios(`https://api.edamam.com/search?q=${ESSEN}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&from=0&to=10${globalString}`);
        setData(result.data);
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
        concatenateString();
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
            {checkboxState.map((tags, i) => (
              <div key={tags, i}>
              <p>{tags.id}</p>
              <input id={tags.id} type="checkbox" checked={tags.select} onClick={getTagValue}/>
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
