import { useEffect, useState } from "react";
import HighScore from "./HighScore";
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import '../../style/scoreCard.scss';

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
        fetchQuizData('url');
    }, [])

    async function fetchQuizData(url: string) {
        let req = await fetch(url);
        let res = await req.json();
        setQuizData(res)
    }

    return (
        <div className="score-card-container">
            <div className="score-card">
                <Typography variant="h5">{`לוח תוצאות:`}</Typography>
                <Typography variant="h6">{quizData.quizName}</Typography>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>0</TableCell>
                                <TableCell>שם</TableCell>
                                <TableCell>ציון</TableCell>
                                <TableCell>תאריך</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {quizData.scores.map((score, i) => <HighScore key={score.id} score={score} i={i} />)}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}

export default ScoreCard;