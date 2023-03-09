import React, { useEffect, useState } from 'react';
import triangleIcon from '../../images/triangeIcon.svg';
import italyPic from '../../images/question-template/italy.png';
import leave from '../../images/openingParagraph/leaveOpeningForTheQuiz.svg';
import OpeningParagraphTitle from './OpeningParagraphTitle';
import CheckForName from './CheckForName';
import PhonePageWithNav from '../navbar/phonePageWithNav';
import { useMediaQuery } from "@mui/material";
import '../../style/OpeningForTheQuiz.scss';
import LoadingMonkey from '../LoadingMonkey';


function OpeningForTheQuiz() {

    const [imgUrl, setImgUrl] = useState("https://www.skideal.co.il/app/uploads/2020/06/Rome-e1591105892246.jpg");
    const [quizTitle, setQuizTitle] = useState("איטליהה מה אתם יודעים?");
    const [paragraph, setParagraph] = useState("לפני הטיסה לאיטליה רציתי לעשות לכם חידון על הארץ המיוחדת הזאת.. מהצפון ועד לדרום מה אתם יודעים? אוהבתת");
    const [changeComponent, setChangeComponent] = useState(true);
    const [loading, setLoading] = useState<boolean>(true);

    const isLargeScreen = useMediaQuery("(min-width: 600px)")


    useEffect(() => {
        getQuizDetailsFromServer();
        getInfoFromServer();
        const timeout = setTimeout(()=> setLoading(false), 4000);
        return () => clearTimeout(timeout);
    }, []);

    const getQuizDetailsFromServer = async () => {
        await fetch(`#`) //TODO: temporary.
            // get image, title, and paragraph for server and push them into state
            .then((res) => res.json)
            .then((data) => {

                // setImgUrl(data.imgUrl);
                // setQuizTitle(data.quizTitle);
                // setParagraph(data.paragraph);
            })
            .catch((err) => {
                console.log(err, "catch");
            })
    }
    function getInfoFromServer(){

    };

    if(loading) return <LoadingMonkey/>;

    
    return (

        isLargeScreen ?
            <div className='compChildrenContainer-boaz'>
                {changeComponent ?
                    <main>
                        <OpeningParagraphTitle
                            quizTitle={quizTitle}
                            paragraph={paragraph}
                            imgUrl={imgUrl}
                            changeComponent={changeComponent}
                            setChangeComponent={setChangeComponent}
                        />
                    </main>
                    :
                    <main>
                        <CheckForName quizTitle={quizTitle} />
                    </main>
                }
            </div>
            :
            <div>
                {changeComponent ?
                    <PhonePageWithNav type='banana' title={quizTitle} className='compChildrenContainer-boaz'>
                        <main className='boaz-main'>
                            <OpeningParagraphTitle
                                quizTitle={quizTitle}
                                paragraph={paragraph}
                                imgUrl={imgUrl}
                                changeComponent={changeComponent}
                                setChangeComponent={setChangeComponent}
                            />
                            <footer className='OpeningParagraphTitle-footer'>
                                <img src={leave} alt="icon of triangle" />
                            </footer>
                        </main>

                    </PhonePageWithNav>
                    :
                    <PhonePageWithNav type='return' title={quizTitle} className='compChildrenContainer-boaz'>
                        <main className='boaz-main'>
                            <CheckForName quizTitle={quizTitle} />
                            <footer className='CheckForName-footer'>
                                <img src={leave} alt="icon of triangle" />
                            </footer>
                        </main>
                    </PhonePageWithNav>
                }
            </div>
    );
}

export default OpeningForTheQuiz;