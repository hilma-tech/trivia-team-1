import React, { useEffect, useState } from 'react';
import triangleIcon from '../icons/Icon-awesome-play.png';
import italyPic from '../img/italy.png'
import OpeningParagraphTitle from './opening-paragraph-title';
import CheckForName from './checkForName';
import '../style/OpeningForTheQuiz.scss';



function OpeningForTheQuiz() {

    const [imgUrl, setImgUrl] = useState("https://www.skideal.co.il/app/uploads/2020/06/Rome-e1591105892246.jpg");
    const [quizTitle, setQuizTitle] = useState("איטליהה מה אתם יודעים?");
    const [paragraph, setParagraph] = useState("לפני הטיסה לאיטליה רציתי לעשות לכם חידון על הארץ המיוחדת הזאת.. מהצפון ועד לדרום מה אתם יודעים? אוהבתת");
    const [changeComponent, setChangeComponent] = useState(true);

    useEffect(() => {
        getInfoFromServer();
    }, []);

    const getInfoFromServer = async () => {
        await fetch(`#`)
            // get image, title, and paragraph for server and push them into state
            .then((res) => res.json)
            .then((data) => {
                console.log("hiiiii");
                // setImgUrl(data.imgUrl);
                // setQuizTitle(data.quizTitle);
                // setParagraph(data.paragraph);
            })
            .catch((err) => {
                console.log(err, "catch");
            })
    }

    return (
        <main>
            {changeComponent ?
                <OpeningParagraphTitle
                    quizTitle={quizTitle}
                    paragraph={paragraph}
                    imgUrl={imgUrl}
                    changeComponent = {changeComponent}
                    setChangeComponent={setChangeComponent}
                />
                :
                <CheckForName quizTitle={quizTitle} />
            }
        </main>
    );
}

export default OpeningForTheQuiz;