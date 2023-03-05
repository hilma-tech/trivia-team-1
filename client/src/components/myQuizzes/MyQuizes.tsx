import { FC, useEffect, useState } from "react";
import { useMediaQuery } from "@mui/material";
import PhonePageWithNav from "../navbar/phonePageWithNav";
import NoQuiz from "./NoQuizes";
import Quiz from "./Quiz";
import "../../style/myQuizes.scss"
import axios, { AxiosResponse } from 'axios';

interface Quiz {
    title: string;
    imageUrl: string;
    description: string;
    id: number;
    questions: number;
}
const MyQuizes: FC = () => {
    const [quizes, setQuizes] = useState<Quiz[]>([{   title: "dfdf",
        imageUrl: "https://static1.personality-database.com/profile_images/c63483c6c8214070acd427f0a75e2f46.png",
        description: "dfdf",
        id: 1,
        questions: 3}]);
    const id=1;


    const axiosInstance = axios.create({
        baseURL: `api/`
      });

    useEffect(()=>{
        getQuizes()
    },[])
    async function getQuizes(){
        const res:AxiosResponse<any, any>= await axiosInstance.get(`user/${id}/quizzes`)
        console.log(res.data);
        setQuizes(res.data);
    }


    const isLargeScreen = useMediaQuery("(min-width: 600px)")

    return (
        isLargeScreen ? <div className="comp-children-container my-quizzes">
            <h1 className="title">החידונים שלי:</h1>
            <div className="container">
                {quizes.length ? quizes.map((quiz, i) => <Quiz key={quiz.id}
                    id={quiz.id}
                    title={quiz.title}
                    imageUrl={quiz.imageUrl}
                    description={quiz.description}
                    questions={quiz.questions} />) : <NoQuiz />}
            </div>
        </div> : <PhonePageWithNav type="return" title="החידונים שלי" className="comp-children-container my-quizzes">
            <div className="container">
                {quizes.length ? quizes.map((quiz, i) => <Quiz key={quiz.id}
                    id={quiz.id}
                    title={quiz.title}
                    imageUrl={quiz.imageUrl}
                    description={quiz.description}
                    questions={quiz.questions} />) : <NoQuiz />}
            </div>
        </PhonePageWithNav>);
}

export default MyQuizes;