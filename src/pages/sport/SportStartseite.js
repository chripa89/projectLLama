import React, { useState, useEffect } from 'react';
import Navigation from "../../components/navigation.js";
import axios from 'axios';

function Sportstartseite() {

    const [state, setState] = useState(false);
    const [data, setData] = useState([]);

    const clientID = '99eade906ced46bbb3239593426a47c0'
    const clientSecret = '0614b2d5e63e453b9ffd34d75849c17b'


      async function  authorize () {

            let formData = new FormData();
            formData.append('grant_type', 'client_credentials');
            formData.append('user', clientID);
            formData.append('password', clientSecret);
            formData.append('scope', 'basic');
            console.log(formData);


            fetch('https://oauth.fatsecret.com/connect/token', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: formData
            })
            .then((response) => response.json())
            .then((responseData) => {
                console.log(responseData);
            });

        };

    function stateNotHookDUMDUM() {
        setState(!state);
        console.log(state);
    }

    return (
        <>
        <div>
          <Navigation />
        </div>

            <div>

                Das ist die Sportstartseite!!!
        </div>

            <button class="btn" onClick={authorize}>api Regquest</button>
            <button class="btn" onClick={stateNotHookDUMDUM}>set state</button>
        </>
    );
}

export default Sportstartseite;
