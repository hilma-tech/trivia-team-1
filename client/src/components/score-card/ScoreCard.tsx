import { useEffect, useState } from "react";
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useMediaQuery } from "@mui/material";
import axios from "axios";
import { ScoreState } from "./interfaces";
import HighScore from "./HighScore";
import PhonePageWithNav from "../navbar/phonePageWithNav";
import '../../style/scoreCard.scss';
import LoadingMonkey from "../LoadingMonkey";

function ScoreCard() {
    const isLargeScreen = useMediaQuery("(min-width: 600px)")
    const [quizData, setQuizData] = useState<ScoreState>({ title: '', scores: [] });
    const [loading, setLoading] = useState<boolean>(true)
    const quizId = window.location.pathname.split('/')[3]

    async function fetchQuizData() {
        try {
            const {data} = await axios.get(`/api/quiz/${quizId}/scores`);
            setQuizData(data)
            return data
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchQuizData();
        const timeout = setTimeout(()=> setLoading(false), 3000);
        return () => clearTimeout(timeout);
    }, [])

    if(loading) return <LoadingMonkey/>;
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