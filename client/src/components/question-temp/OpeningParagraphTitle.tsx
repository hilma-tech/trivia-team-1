import React, { useEffect, useState } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useMediaQuery } from "@mui/material";
import triangleIcon from '../../images/question-template/triangle-icon.svg';
import italyPic from '../../images/question-template/italy.png';
import '../../style/OpeningForTheQuiz.scss';
import OpeningForTheQuiz from './OpeningForTheQuiz';

interface OpeningParagraphTitleProps {
    quizTitle: string,
    paragraph: string,
    imgUrl: string,
    changeComponent: boolean,
    setChangeComponent: any,
    // type: "banana"
}

const OpeningParagraphTitle: React.FC<OpeningParagraphTitleProps> = ({ quizTitle, paragraph, imgUrl, changeComponent, setChangeComponent }) => {
    const isLargeScreen = useMediaQuery("(min-width: 600px)")
    const moveToQuiz = () => {
        let boolHolder = changeComponent
        boolHolder ? boolHolder = false : boolHolder = true;
        setChangeComponent(boolHolder);
    }

    return (
        <div className='main-OpeningForTheQuiz'>
            {/* saugfsfresrtyrytrfaslkjfdsz */}
            <div className='main-paragraph-and-title'>
                {/* <div>hellllllllo</div> */}
                {/* <Typography variant="h2" className="bold h2" component="div">{`לוח תוצאות:`}</Typography>
                <Typography variant='h2' component='div'>{quizTitle}</Typography>
                <Typography variant='h5' component='div'>{quizTitle}</Typography> */}
                <h1>{quizTitle}</h1>
                <p>{paragraph}</p>
            </div>
            {isLargeScreen ?
                <div className='main-img'
                    style={{
                        backgroundImage: `url("${imgUrl}")`,
                        objectFit: 'cover',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat'
                    }}>
                    <div className='main-button-place'>
                        <button onClick={moveToQuiz} className='main-button-to-quiz'>
                            <p>התחילו לשחק</p>
                            <img src={`${triangleIcon}`} alt="icon of triangle" />
                        </button>
                    </div>
                </div>
                :
                <div>
                    <img className='main-img' src={`${imgUrl}}`}
                        alt="pic of something that connected to the question" />
                    <button onClick={moveToQuiz} className='main-button-to-quiz'>
                        <p>התחילו לשחק</p>
                        <img src={`${triangleIcon}`} alt="icon of triangle" />
                    </button>
                </div >
            }
        </div>
    );
}

export default OpeningParagraphTitle;