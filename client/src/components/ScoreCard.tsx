import React, { useEffect, useState } from "react";
import HighScore from "./HighScore";
import '../style/scoreCard.scss';

// interface ScoreType {
//     score: {
//         id:number;
//         name: string;
//         score: number;
//         date: Date
//     };
// }

function ScoreCard() {

    const [quizData, setQuizData] = useState({
        quizName: 'שלום עולם',
        scores: [
            { id: 1, name: 'גדשכדגכ', score: 99, date: new Date() },
            { id: 2, name: 'ששששששששש', score: 90, date: new Date() },
            { id: 3, name: 'הההההההה', score: 34, date: new Date() },
            { id: 3, name: 'ללללללללל', score: 34, date: new Date() },
            { id: 3, name: 'ררררררררררר', score: 34, date: new Date() }
        ]
    });

    useEffect(() => {
        // fetchQuizData('url');
    }, [])

    async function fetchQuizData(url: string) {
        let req = await fetch(url);
        let res = await req.json();
        setQuizData(res)
    }



    return (
        <div className="container">
            <div className="score-card">
                <h2>{`לוח תוצאות:`}</h2>
                <h3>{quizData.quizName}</h3>
                <div className="scores">
                    <div className="score-header">
                        <span className="id">0</span><span className="name">שם</span><span className="score">ציון</span><span className="date">תאריך</span>
                    </div>
                    {quizData.scores.map((score, i) => <HighScore key={i} score={score} i={i} />)}
                </div>
            </div>
        </div>
    )
}

export default ScoreCard;