import React, { useEffect, useState } from 'react';
import triangleIcon from '../icons/Icon-awesome-play.png';
import italyPic from '../img/italy.png'
import '../style/OpeningForTheQuiz.scss';

interface OpeningParagraphTitleProps {
    quizTitle: string,
    paragraph: string,
    imgUrl: string,
    changeComponent: boolean
    setChangeComponent: any
}

const OpeningParagraphTitle: React.FC<OpeningParagraphTitleProps> = ({ quizTitle, paragraph, imgUrl,changeComponent, setChangeComponent }) => {

    const mooveToQuiz = () => {
        let boolHolder = changeComponent
        setChangeComponent(!boolHolder);
    }
    
    return (
        <main >
            <div className='main-OpeningForTheQuiz'>
                <div className='main-paragraph-and-title'>
                    <h1>
                        {quizTitle}
                    </h1>
                    <p>
                        {paragraph}
                    </p>
                </div>
                <div className='main-img' 
                style={{
                    backgroundImage: `url("${imgUrl}")`,
                    objectFit: 'cover',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'
                }}>
                    <div className='main-button-place'>
                        <button onClick={mooveToQuiz} className='main-button-to-quiz'>
                            <p>התחילו לשחק</p>
                            <img src={`${triangleIcon}`} alt="icon of triangle" />
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default OpeningParagraphTitle;