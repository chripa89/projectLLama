import React from 'react';
import Navigation from "../../components/navigation.js";


function Settings() {
    const [user, setUser] = useState({
    });




    const [state, setState] = useState(false);
    useEffect(() => {

        const id = localStorage.getItem('User')


        axios.get(`http://localhost:5000/users/${id}`, user)
            .then(response => {

                setUser({
                    username: response.data.username,
                    passwort: response.data.passwort,
                    alter: response.data.alter,
                    groesse: response.data.groesse,
                    gewicht: response.data.gewicht,
                    geschlecht: response.data.geschlecht,
                    pal: response.data.pal
                })
                console.log(response.data);

            })
            .catch(err => console.log(err)
            )

    }, []);
    function handleChange(e) {
        const { name, value } = e.target;
        setUser(user => ({ ...user, [name]: value }));
        console.log("CHANGES: ", user);


    }

    function updateData() {
        const id = localStorage.getItem('User')
        axios.post(`http://localhost:5000/users/update/${id}`, user)
            .then(res => res.data
            )

        alert('user updated')
    }
    return (

        <>
            <div>
              <Navigation />
            </div>
            <div>
                <div>
                    <br />
                    <h4>Gewicht in kg</h4>

                    <input type="text" name="gewicht" placeholder="Gewicht eintragen" onChange={handleChange}></input>

                    <h4>Größe in cm</h4>

                    <input type="text" name="groesse" placeholder="Größe in cm eintragen" onChange={handleChange}></input>

                    <h4>Alter</h4>

                    <input type="text" name="alter" placeholder="Alter eintragen" onChange={handleChange}></input>

                    <h4>Geschlecht</h4>
                    <select type="text" name="geschlecht" placeholder="Geschlecht eintragen" onChange={handleChange}>

                        <option>Bitte Auswählen</option>
                        <option value="mann">Mann</option>
                        <option value="frau">Frau</option>

                    </select>
                    <h4>Aktivitätslevel (PAL)</h4>
                    <div>
                        <a href="https://de.wikipedia.org/wiki/Leistungsumsatz" target="_blank">Was ist PAL ?</a>

                        <p>Wie aktiv bist du?</p>

                        <select type="text" name="pal" onChange={handleChange}>
                            <option>Bitte Auswählen</option>
                            <option value="1.2">Nur sitzend oder liegend (PAL 1,2)</option>

                            <option value="1.45">Sitzend, kaum aktiv (PAL 1.45)</option>
                            <option value="1.65">Sitzend, gehend und stehend (PAL 1,65)</option>
                            <option value="1.85">Vorwiegend stehend/gehend (PAL 1.85)</option>
                            <option value="2.2">Anstrengende Arbeit/Sport (PAL 2,2)</option>


                        </select>
                        {user.pal === '1.2' && <p>Menschen mit ausschließlich sitzender bzw. liegender Lebensweise (z.B. alte, gebrechliche Menschen)</p>}
                        {user.pal === '1.45' && <p>Menschen mit fast ausschließlich sitzender Arbeitsweise und wenig Freizeitaktivitäten (z.B. Menschen, die viel am Schreibtisch arbeiten)</p>}
                        {user.pal === '1.65' && <p>Menschen mit vorwiegend sitzender und vereinzelt stehender bzw. gehender Tätigkeit und keine oder nur gering anstrengende Freizeitaktivität (z.B. Schüler, Studenten, Kraftfahrer, Laboranten)</p>}
                        {user.pal === '1.85' && <p>Menschen mit überwiegend gehenden bzw. stehenden Tätigkeiten (z.B. Hausfrauen, Kellner, Handwerker, Verkäufer/innen)</p>}
                        {user.pal === '2.2' && <p>Menschen mit körperlich anstrengenden Tätigkeiten (z.B. Landwirte, Bergleute, Leistungssportler)</p>}

                    </div>

                    <br />
                    <button onClick={updateData}>Update</button>

                </div>
            </div>
        </>
    );
}

export default Settings;
