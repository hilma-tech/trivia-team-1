import React, { useState } from 'react';
import triangleIcon from '../../icons/icon-awesome-play.png';

interface CheckForNameProps {
    quizTitle: string
}

const CheckForName: React.FC<CheckForNameProps> = ({ quizTitle }) => {

    const [playerName, setPlayerName] = useState("");

    function sendNameOfPlayerToServer() {
        fetch(`#`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ playerName: playerName })
        })
            .then((response) => response.json())
            .then((data) => {
                moveToPlayGame();
            })
            .catch((err) => {
                console.log("sendNameOfPlayerToServer");
                console.log(err, "catch");
            })
    }

    const moveToPlayGame = () => {
        // navigate();
        console.log("navigate");
    }

    return (
        <main>
            <div className='main-CheckForName-for-flex'>
                <div className='main-CheckForName'>
                    <div className='title-and-paragraph'>
                        <h1 className='quizTitle'>{quizTitle}</h1>
                        <p>איך קוראים לכם?</p>
                    </div>
                    <form name="identification-form">
                        <input
                            onChange={(ev) => setPlayerName(ev.target.value)}
                            name="player-identification" type="text"
                            placeholder="נא להזין שם"
                            value={playerName} required
                        />
                    </form>
                    <button className='CheckForName-button' onClick={sendNameOfPlayerToServer}>
                        <p>!יאללה בואו נתחיל</p>
                        <img src={`${triangleIcon}`} alt="icon of triangle" />
                    </button>
                </div>
            </div>
        </main>
    );
}
export default CheckForName;
