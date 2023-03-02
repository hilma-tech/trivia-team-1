import { useEffect, useState } from "react";
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useMediaQuery } from "@mui/material";
import axios from "axios";

import HighScore from "./HighScore";
import PhonePageWithNav from "../navbar/phonePageWithNav";

import '../../style/scoreCard.scss';

function ScoreCard() {
    const isLargeScreen = useMediaQuery("(min-width: 600px)")
    const [quizData, setQuizData] = useState({//data in this state is temporary
        title: 'שלום עולם',
        scores: [
            { id: 1, player: 'גדשכדגכ', score: 99, date: new Date() },
            { id: 2, player: 'ששששששששש', score: 90, date: new Date() },
            { id: 3, player: 'הההההההה', score: 34, date: new Date() },
            { id: 4, player: 'ללללללללל', score: 34, date: new Date() },
            { id: 5, player: 'ררררררררררר', score: 34, date: new Date() }
        ]
    });
    let quizId = 4 //temporary

    async function fetchQuizData() {
        try {
            const res = await axios.get(`api/quiz/${quizId}/scores`);
            console.log(res);

            return res
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        // fetchQuizData();// will activate once server is ready
    }, [])

    return (
        isLargeScreen ? <div className="comp-children-container score-card-container">
            <div className="score-card">
                <Typography variant="h5" className="h2" component="div">{`לוח תוצאות:`}</Typography>
                <Typography variant="h6" className="h3 hide-mobile" component="div">{quizData.title}</Typography>
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
                            {quizData.scores.map((score, i) => <HighScore key={score.id} score={score} index={i} />)}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div> : <PhonePageWithNav className="comp-children-container phone-score-card-container" title="החידונים שלי" type="return">
            <div className="score-card">
                <Typography variant="h5" className="h2" component="div">{`לוח תוצאות:`}</Typography>
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
                            {quizData.scores.map((score, i) => <HighScore key={score.id} score={score} index={i} />)}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </PhonePageWithNav>
    );
}

export default ScoreCard;