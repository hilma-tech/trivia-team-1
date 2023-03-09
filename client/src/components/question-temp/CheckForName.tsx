import React, { useState } from 'react';
import { useMediaQuery } from "@mui/material";
import triangleIcon from '../../icons/icon-awesome-play.png';
import { useNavigate } from 'react-router-dom';
import arrowRight from '../../icons/arrow-right.svg';
import PhonePageWithNav from '../navbar/phonePageWithNav';


interface CheckForNameProps {
    quizTitle: string
}

const CheckForName: React.FC<CheckForNameProps> = ({ quizTitle }) => {

    const [playerName, setPlayerName] = useState("");
    const navigate = useNavigate();

    const isLargeScreen = useMediaQuery("(min-width: 600px)")
    function sendNameOfPlayerToServer() {
        //TODO: change this from "#"
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
            })
            moveToPlayGame()
    }

    const moveToPlayGame = () => {
        navigate('/ofek/quiz/1/questions');
    }

    return (
        isLargeScreen ?
            <main>
                <div className='main-check-for-name-for-flex'>
                    <div className='main-check-for-name'>
                        <div className='title-and-paragraph'>
                            <h1 className='quizTitle'>{quizTitle}</h1>
                            <p className='main-check-for-name-p'>איך קוראים לכם?</p>
                        </div>
                        <input className='main-check-for-name-input' onChange={(ev) => setPlayerName(ev.target.value)}
                            name="player-identification" type="text"
                            placeholder="נא להזין שם" value={playerName} required
                        />
                        <button className='check-for-name-button' onClick={sendNameOfPlayerToServer}>
                            <p className='check-for-name-button-p'>יאללה בואו נתחיל!</p>
                            <img className='check-for-name-button-img' src={`${triangleIcon}`} alt="icon of triangle" />
                        </button>
                    </div>
                </div>
            </main>
            :
            < div>
                <div className='main-check-for-name-for-flex'>
                    <div className='main-check-for-name'>
                        <div className='title-and-paragraph'>
                            <p>איך קוראים לכם?</p>
                        </div>
                        <input onChange={(ev) => setPlayerName(ev.target.value)}
                            name="player-identification" type="text"
                            placeholder="נא להזין שם" value={playerName} required
                        />
                        <button className='check-for-name-button' onClick={sendNameOfPlayerToServer}>
                            <p>יאללה בואו נתחיל!</p>
                            <img src={`${triangleIcon}`} alt="icon of triangle" />
                        </button>
                    </div>
                </div>
            </div >

    );
}
export default CheckForName;
