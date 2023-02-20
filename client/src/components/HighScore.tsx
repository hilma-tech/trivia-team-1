import React, { FC } from "react";
import gold from '../images/crowns/gold.svg'
import silver from '../images/crowns/silver.svg'
import bronze from '../images/crowns/bronze.svg'
interface ScoreType {
    score: {
        id: number
        name: string;
        score: number;
        date: Date;
    };
    i: number
}

function HighScore(props: ScoreType) {
    console.log(props.i);
    let { id, name, score, date } = props.score;
    let src;
    switch (props.i) {
        case 0:
            src = gold
            break;
        case 1:
            src = silver
            break;
        case 2:
            src = bronze
            break
        default:
            break;
    }

    return (
        <div className="score-p">
            <span className="id">{id}</span>
            <span className="name">{name} <img src={src} /></span>
            <span className="score">{score}</span>
            <span className="date">{date.toLocaleDateString()}</span>
        </div>
    );
}


export default HighScore;
