import { FC, useEffect, useState } from "react";
import { useMediaQuery } from "@mui/material";
import PhonePageWithNav from "../navbar/phonePageWithNav";
import NoQuiz from "./NoQuizes";
import Quiz from "./Quiz";
import "../../style/myQuizes.scss"
import axios, { AxiosResponse } from 'axios';

export interface QuizType {
    title: string;
    imageUrl: string;
    description: string;
    id: number;
    questions: number;
}
const MyQuizes: FC = () => {
    const [quizes, setQuizes] = useState<QuizType[]>([]);
    const id=2;
    console.log(`Quizes:`, quizes)

    const axiosInstance = axios.create({
        baseURL: `api/`
      });

    useEffect(()=>{
        getQuizes()
    },[])
    async function getQuizes(){
        const res:AxiosResponse<any, any>= await axiosInstance.get(`user/${id}/quizzes`)
        setQuizes(res.data);
    }


    const isLargeScreen = useMediaQuery("(min-width: 600px)")

    return (
        isLargeScreen ? <div className="comp-children-container my-quizzes">
            <h1 className="title">החידונים שלי:</h1>
            <div className="container">
                {quizes.length ? quizes.map((quiz, i) => <Quiz key={quiz.id}
                    setQuizes={setQuizes}
                    quizzes={quizes}
                    id={quiz.id}
                    title={quiz.title}
                    imageUrl={quiz.imageUrl}
                    description={quiz.description}
                    questions={quiz.questions} />) : <NoQuiz />}
            </div>
        </div> : <PhonePageWithNav type="return" title="החידונים שלי" className="comp-children-container my-quizzes">
            <div className="container">
                {quizes.length ? quizes.map((quiz, i) => <Quiz key={quiz.id}
                    setQuizes={setQuizes}
                    quizzes={quizes}
                    id={quiz.id}
                    title={quiz.title}
                    imageUrl={quiz.imageUrl}
                    description={quiz.description}
                    questions={quiz.questions} />) : <NoQuiz />}
            </div>
        </PhonePageWithNav>);
}

export default MyQuizes;