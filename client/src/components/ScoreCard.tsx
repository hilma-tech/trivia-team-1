import React, { useEffect, useState } from "react";
import HighScore from "./HighScore";
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
// import '../style/scoreCard.scss';

function ScoreCard() {
    const [quizData, setQuizData] = useState({
        quizName: 'שלום עולם',
        scores: [
            { id: 1, name: 'גדשכדגכ', score: 99, date: new Date() },
            { id: 2, name: 'ששששששששש', score: 90, date: new Date() },
            { id: 3, name: 'הההההההה', score: 34, date: new Date() },
            { id: 4, name: 'ללללללללל', score: 34, date: new Date() },
            { id: 5, name: 'ררררררררררר', score: 34, date: new Date() }
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
            <Typography className="h2">{`לוח תוצאות:`}</Typography>
            <Typography className="h3">{quizData.quizName}</Typography>
            <TableContainer>
                <Table sx={{ borderBottom: 0 }}>
                    <TableHead sx={{ border: 0 }}>
                        <TableRow sx={{ border: 0 }}>
                            <TableCell align="right">0</TableCell>
                            <TableCell align="right">שם</TableCell>
                            <TableCell align="right">ציון</TableCell>
                            <TableCell align="right">תאריך</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{ border: 0 }}>
                        {quizData.scores.map((score, i) => <HighScore key={score.id} score={score} i={i} />)}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
// //////////////////////
// // interface ScoreType {
// //     score: {
// //         id:number;
// //         name: string;
// //         score: number;
// //         date: Date
// //     };
// // }

// function ScoreCard() {

//     const [quizData, setQuizData] = useState({
//         quizName: 'שלום עולם',
//         scores: [
//             { id: 1, name: 'גדשכדגכ', score: 99, date: new Date() },
//             { id: 2, name: 'ששששששששש', score: 90, date: new Date() },
//             { id: 3, name: 'הההההההה', score: 34, date: new Date() },
//             { id: 3, name: 'ללללללללל', score: 34, date: new Date() },
//             { id: 3, name: 'ררררררררררר', score: 34, date: new Date() }
//         ]
//     });

//     useEffect(() => {
//         // fetchQuizData('url');
//     }, [])

//     async function fetchQuizData(url: string) {
//         let req = await fetch(url);
//         let res = await req.json();
//         setQuizData(res)
//     }



//     return (
//         <div className="container">
//             <div className="score-card">
//                 <Typography className="h2">{`לוח תוצאות:`}</Typography>
//                 <Typography className="h3">{quizData.quizName}</Typography>
//                 {/* <h2>{`לוח תוצאות:`}</h2>
//                 <h3>{quizData.quizName}</h3> */}
//                 <div className="scores">
//                     <div className="score-header">
//                         <span className="id">0</span><span className="name">שם</span><span className="score">ציון</span><span className="date">תאריך</span>
//                     </div>
//                     {quizData.scores.map((score, i) => <HighScore key={i} score={score} i={i} />)}
//                 </div>
//             </div>
//         </div>
//     )
// }

export default ScoreCard;