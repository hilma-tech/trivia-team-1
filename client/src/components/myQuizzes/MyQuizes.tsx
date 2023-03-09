import { FC, useEffect, useState } from "react";
import { useMediaQuery } from "@mui/material";

import PhonePageWithNav from "../navbar/phonePageWithNav";
import NoQuiz from "./NoQuizes";
import Quiz from "./Quiz";

import "../../style/myQuizes.scss"
import LoadingMonkey from "../LoadingMonkey";

interface Quiz {
    name: string;
    url: string;
    description: string;
    id: number;
    answers: number;
}

const arr: Quiz[] = 
[
    { name: 'שגיא', description: 'שגיא', id: 1, answers: 8, url: 'https://static1.personality-database.com/profile_images/c63483c6c8214070acd427f0a75e2f46.png' },
    { name: 'שגיא', description: 'שגיא', id: 2, answers: 8, url: 'https://static1.personality-database.com/profile_images/c63483c6c8214070acd427f0a75e2f46.png' },
    { name: 'שקרקקרקרגיא', description: 'שגיא', id: 3, answers: 4, url: 'https://static1.personality-database.com/profile_images/c63483c6c8214070acd427f0a75e2f46.png' },
    { name: 'שגיא', description: 'שגיא', id: 4, answers: 3, url: 'https://static1.personality-database.com/profile_images/c63483c6c8214070acd427f0a75e2f46.png' }
]

const MyQuizes: FC = () => {
    const [quizes, setQuizes] = useState<Quiz[]>(arr);
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(()=>{
        const timeout = setTimeout(()=> setLoading(false), 3000);

        return () => clearTimeout(timeout);
    }, [])

    const isLargeScreen = useMediaQuery("(min-width: 600px)")

    if(loading) return <LoadingMonkey/>;

    return (
        isLargeScreen ? <div className="comp-children-container my-quizzes">
            
            <h1 className="title">החידונים שלי:</h1>
            <div className="container">
                {quizes.length ? quizes.map((quiz, i) => <Quiz key={quiz.id}
                    id={quiz.id}
                    name={quiz.name}
                    url={quiz.url}
                    description={quiz.description}
                    answers={quiz.answers} />) : <NoQuiz />}
            </div>
        </div> : <PhonePageWithNav type="return" title="החידונים שלי" className="comp-children-container my-quizzes">
            <div className="container">
                {quizes.length ? quizes.map((quiz, i) => <Quiz key={quiz.id}
                    id={quiz.id}
                    name={quiz.name}
                    url={quiz.url}
                    description={quiz.description}
                    answers={quiz.answers} />) : <NoQuiz />}
            </div>
        </PhonePageWithNav>);
}

export default MyQuizes;