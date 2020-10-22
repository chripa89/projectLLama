import React, { useState, useEffect } from "react";
import Navigation from "../../components/navigation.js";
import axios from "axios";

function Ernaehrungstartseite() {
  const [entrySearch, setEntrySearch] = useState([
    {
      essen: "",
    },
  ]);
  const [data, setData] = useState({ hits: [] });
  const [search, setSearch] = useState(false);
  const [checkboxState, setCheckboxState] = useState([]); //leeres Array
  const [stringConcat, setStringConcat] = useState([]);
  const [globalString, setGlobalString] = useState("");

  useEffect(() => {
    concatenateString();
   
    let checkboxState = [
      { id: "alcohol-free", name: "tagValue" },
      { id: "crustacean-free", name: "tagValue" },
      { id: "shellfish-free", name: "tagValue" },
      { id: "dairy-free", name: "tagValue" },
      { id: "egg-free", name: "tagValue" },
      { id: "fish-free", name: "tagValue" },
      { id: "peanut-free", name: "tagValue" },
      { id: "soy-free", name: "tagValue" },
      { id: "gluten-free", name: "tagValue" },
      { id: "keto-friendly", name: "tagValue" },
      { id: "paleo", name: "tagValue" },
      { id: "kosher", name: "tagValue" },
      { id: "vegetarian", name: "tagValue" },
      { id: "vegan", name: "tagValue" },
      { id: "sugar-conscious", name: "tagValue" },
      { id: "no-sugar", name: "tagValue" },
      { id: "low-carb", name: "tagValue" },
    ];
    setCheckboxState(
      checkboxState.map((data) => {
        return {
          select: false,
          id: data.id,
          name: data.name,
        };
      })
    );
  }, [stringConcat]);

  function getTagValue(e) {
    let checked = e.checked;

    setCheckboxState(
      checkboxState.map((data) => {
        if (e.id == data.id) {
          data.select = checked;

          if (checked === true) {
            if (stringConcat.includes(data.id) == false) {
              setStringConcat((stringConcat) => stringConcat.concat(data.id));
            }
          } else {
            let result = stringConcat.filter((el) => el !== data.id);

            if (result) {
              setStringConcat(result);
            }
          }
        }
        console.log(data);
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
    const YOUR_APP_ID = "6ff3b59b";
    const YOUR_APP_KEY = "53f9547355139ebdda5640fee4c27c90";
    let ESSEN = entrySearch.essen;
    console.log(globalString, 'GlobalString in Async');
    const result = await axios(
      `https://api.edamam.com/search?q=${ESSEN}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&from=0&to=10${globalString}`
    );
    setData(result.data);
    console.log(data, "LÖLÖLÖL");
    console.log(result.data, "LALALA");
  }

  

  function getInput(e) {
    const { name, value } = e.target;
    setEntrySearch((entrySearch) => ({ ...entrySearch, [name]: value }));
    console.log("CHANGES: ", entrySearch.essen);
    // setSearch(false)
  }

  function handleSubmit(e) {
   
    searchMeal();
    setSearch(true);
    console.log(data, "TEST");
  }

  function addChecked(e) {
 
    let element = e;
    let parent = element.parentNode;
    console.log(parent);
    parent.classList.toggle("isChecked");
  }

  function checkTag(e){
    let element = e.target;
    getTagValue(element);
    addChecked(element);
    

  }
  return (
    <>
      <div>
        <Navigation />
      </div>

      <br />
      <div>Das ist die Ernährungs Startseite WhoopWhoop!</div>
      <div>
        <div class="water-row">
          <ul>
            <li class="water-item" onClick={addChecked}>
              <img src={require("./water-glass.svg")} />
            </li>
            <li class="water-item" onClick={addChecked}>
              <img src={require("./water-glass.svg")} />
            </li>
            <li class="water-item" onClick={addChecked}>
              <img src={require("./water-glass.svg")} />
            </li>
            <li class="water-item" onClick={addChecked}>
              <img src={require("./water-glass.svg")} />
            </li>
            <li class="water-item" onClick={addChecked}>
              <img src={require("./water-glass.svg")} />
            </li>
          </ul>
        </div>
      </div>
      <div class="checkboxes">
        {checkboxState.map((tags, i) => (
          <div key={(tags, i)} class="checkbox">
            <input
              id={tags.id}
              class="filter-checkbox"
              type="checkbox"
              checked={tags.select}
              onChange={checkTag}
            />
            
            <span class="filter-wrapper">
              <span class="filter-button"></span>
              <span class="filter-content">{tags.id}</span>
            </span>
          </div>
        ))}
      </div>

      <input
        type="text"
        placeholder="Search..."
        name="essen"
        onChange={getInput}
      />
      <button onClick={handleSubmit}>Search</button>
      <div class="results">
        {search && (
          <ul>
            {data.hits.map((item) => (
              <li key={item.objectID}>
                <a href="">
                  <p>{`${item.recipe.healthLabels}`}</p>
                  <img src={item.recipe.image} alt="filler" />
                </a>
                <div class="label-wrapper">
                  <p class="label">{`${item.recipe.label}`}</p>
                  <p class="label _calc">{`${Math.floor(item.recipe.calories / item.recipe.yield)} kCal pro Mahlzeit`}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default Ernaehrungstartseite;
