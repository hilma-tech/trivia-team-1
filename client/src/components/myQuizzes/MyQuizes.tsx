import { FC, useEffect, useState } from "react";
import { useMediaQuery } from "@mui/material";
import PhonePageWithNav from "../navbar/phonePageWithNav";
import NoQuiz from "./NoQuizes";
import Quiz from "./Quiz";
import "../../style/myQuizes.scss"
import axios, { AxiosResponse } from 'axios';
import LoadingMonkey from "../LoadingMonkey";
import { useUser } from "../../context/UserContext";

export interface QuizType {
    title: string;
    imageUrl: string;
    description: string;
    id: number;
    questions: Question[];
}

export interface Question{
    id: number;
    title: string;
    imageUrl: string;
    answers: Answer[];
}

export interface Answer{
    id: number;
    text: string;
    imageUrl: string;
    isCorrect: boolean;
}


const MyQuizes: FC = () => {
    const [quizes, setQuizes] = useState<QuizType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const {user} = useUser();
    


    console.log(quizes)

    useEffect(()=>{
        getQuizes()
    },[user])
    async function getQuizes(){
        const { data }:AxiosResponse<any, any>= await axios.get(`api/user/${user.userId}/quizzes`)
        const timeout = setTimeout(()=> setLoading(false), 0);
        setQuizes(data);
        return () => clearTimeout(timeout);
    }


    useEffect(()=>{
    }, [])

    const isLargeScreen = useMediaQuery("(min-width: 600px)")

    if(loading) return <LoadingMonkey/>;

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