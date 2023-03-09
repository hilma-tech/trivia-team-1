import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import triangleIcon from '../../images/triangeIcon.svg';
import italyPic from '../../images/question-template/italy.png';
import leave from '../../images/openingParagraph/leaveOpeningForTheQuiz.svg';
import OpeningParagraphTitle from './openingParagraphTitle';
import CheckForName from './checkForName';
import PhonePageWithNav from '../navbar/phonePageWithNav';
import { useMediaQuery } from "@mui/material";
import axios from 'axios';
import '../../style/OpeningForTheQuiz.scss';


function OpeningForTheQuiz() {

    const [imgUrl, setImgUrl] = useState("https://www.skideal.co.il/app/uploads/2020/06/Rome-e1591105892246.jpg");
    const [quizTitle, setQuizTitle] = useState("איטליהה מה אתם יודעים?");
    const [paragraph, setParagraph] = useState("לפני הטיסה לאיטליה רציתי לעשות לכם חידון על הארץ המיוחדת הזאת.. מהצפון ועד לדרום מה אתם יודעים? אוהבתת");
    const [changeComponent, setChangeComponent] = useState(true);
    const isLargeScreen = useMediaQuery("(min-width: 600px)")
    let { quizName } = useParams();


    useEffect(() => {
        getInfoFromServer();
    }, []);

    const getInfoFromServer = async () => {
        const response = await axios.get(`http://localhost:8080/api/quiz/${quizName}`)
                setImgUrl(response.data.imgUrl);
                setQuizTitle(response.data.title);
                setParagraph(response.data.description);
    }
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