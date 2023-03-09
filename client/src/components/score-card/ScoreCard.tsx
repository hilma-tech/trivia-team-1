import { FC, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useMediaQuery } from "@mui/material";
import axios from "axios";
import { QuizDataState } from "../../utils/Interfaces";
import HighScore from "./HighScore";
import PhonePageWithNav from "../navbar/phonePageWithNav";
import '../../style/scoreCard.scss';

const ScoreCard: FC = () => {
    const [quizData, setQuizData] = useState<QuizDataState>({ title: '', scores: [] });
    const isLargeScreen = useMediaQuery("(min-width: 600px)")
    const { quizId } = useParams();

    async function fetchQuizData() {
        try {
            const { data } = await axios.get(`/api/quiz/${quizId}/scores`);
            setQuizData(data)
            return data
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchQuizData();
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