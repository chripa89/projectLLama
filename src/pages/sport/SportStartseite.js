import React, { useState, useEffect } from 'react';
import Navigation from "../../components/navigation.js";
import WeekCalendar from 'react-week-calendar';
import Event from 'react-week-calendar';
import 'react-week-calendar/dist/style.css';



function Sportstartseite() {

    

    const [allProps, setAllProps] = useState([
        
    ])

    const [propType, setpropType] = useState({
        scaleUnit: 60,
       
        onIntervalSelect: (e) => {
          console.log(e[0].value);
          setAllProps([e])
    },
    selectedIntervals: allProps


    })

    const [Test, setTest] = useState({
        
    })

function Schick() {
console.log(allProps, "Are Bastards kappa");

}





return (

    <>
        <div>
            <Navigation />
        </div>

        <div>

            <WeekCalendar
                {...propType}
                
            />
      

            <button onClick={Schick}>TEST</button>
        </div>


    </>
);
}

export default Sportstartseite;
