import { useEffect, useState } from "react";
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
// import axios, { isAxiosError, isCancel } from "axios";
import HighScore from "./HighScore";
import '../../style/scoreCard.scss';

function ScoreCard() {

    const [quizData, setQuizData] = useState({//data in this state is temporary
        quizName: 'שלום עולם',
        scores: [
            { id: 1, name: 'גדשכדגכ', score: 99, date: new Date() },
            { id: 2, name: 'ששששששששש', score: 90, date: new Date() },
            { id: 3, name: 'הההההההה', score: 34, date: new Date() },
            { id: 4, name: 'ללללללללל', score: 34, date: new Date() },
            { id: 5, name: 'ררררררררררר', score: 34, date: new Date() }
        ]
    });

    // async function fetchQuizData() {
    //     try {
    //         const res = await axios.get('/quiz?ID=12345');
    //         console.log(res);
    //     } catch (err) {
    //         console.error(err);
    //     }
    // }

    useEffect(() => {
        // fetchQuizData();// will activate once server is ready
    }, [])

    return (
        <div className="comp-children-container score-card-container">
            <div className="score-card">
                <Typography variant="h5" className="h2" component="div">{`לוח תוצאות:`}</Typography>
                <Typography variant="h6" className="h3 hide-mobile" component="div">{quizData.quizName}</Typography>
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
        </div>
    );
}

export default ScoreCard;