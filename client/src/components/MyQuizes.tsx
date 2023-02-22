import { FC, useState } from "react";
import Quiz from "./Quiz";
import "../style/myQuizes.scss"
import NoQuiz from "./NoQuizes";



interface QuizP {
    name: string;
    url: string;
    description: string;
    id: number;
    answers: number;
}


const MyQuizes: FC = () => {

    const [quizes, setQuizes] = useState<QuizP[]>([{name: 'שגיא', description:'שגיא',id:4,answers:8,url:'https://static1.personality-database.com/profile_images/c63483c6c8214070acd427f0a75e2f46.png'},{name: 'שגיא', description:'שגיא',id:4,answers:8,url:'https://static1.personality-database.com/profile_images/c63483c6c8214070acd427f0a75e2f46.png'},{name: 'שקרקקרקרגיא', description:'שגיא',id:4,answers:4,url:'https://static1.personality-database.com/profile_images/c63483c6c8214070acd427f0a75e2f46.png'},{name: 'שגיא', description:'שגיא',id:4,answers:3,url:'https://static1.personality-database.com/profile_images/c63483c6c8214070acd427f0a75e2f46.png'}]
    );


    return (<div className="myQuizes">
        <h1 id="title" style={window.innerWidth<600 ? {display:"none"}:{}}>החידונים שלי:</h1>
        <div id="container">
            {quizes.length > 0 ? quizes.map((quiz, i) => <Quiz key={i}
                id={quiz.id}
                name={quiz.name}
                url={quiz.url}
                description={quiz.description}
                answers={quiz.answers} />) : <NoQuiz />}
        </div>
    </div>);
}

export default MyQuizes;