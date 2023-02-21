import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import '../style/QuastionTemp.css';
import { width } from '@mui/system';

interface IState {
    answers: {
        ans: string,
        url: string,
        isCorrect: boolean
    }[],
    question: {
        questionTitle: string,
        url: string
    }
}


const QuastionTemp = () => {
    const [answers, setAnswers] = useState<IState["answers"]>([
        { ans: "ארץ המגף", url: "https://img.mako.co.il/2021/07/07/GettyImages-51246878_re_autoOrient_i.jpg", isCorrect: true },
        { ans: "התפוח הגדול", url: "sdvsdv", isCorrect: false },
        { ans: "ארץ האגדות", url: "awvev", isCorrect: false },
        { ans: "מדינת הגמדים", url: "dvdsv", isCorrect: false }
        // { ans: "ארץ המגף", url: "", isCorrect: true },
        // { ans: "התפוח הגדול", url: "", isCorrect: false },
        // { ans: "ארץ האגדות", url: "", isCorrect: false },
        // { ans: "מדינת הגמדים", url: "", isCorrect: false }
    ]);
    const [question, setQuestion] = useState<IState["question"]>({
        questionTitle: "איטליה מכונה גם...", url: "https://upload.wikimedia.org/wikipedia/he/e/e3/%D7%9E%D7%93%D7%99%D7%A0%D7%AA_%D7%94%D7%92%D7%9E%D7%93%D7%99%D7%9D.jpg"
    });
    const [numOfQuestion, setNumOfQuestion] = useState(0);
    const [scoreRecWidth, setScoreRecWidth] = useState(30);
    const [quantityOfQuestion, setQuantityOfQuestion] = useState(10);
    const [changeColorToGreen, setChangeColorToGreen] = useState<number>(1000);
    const [changeColorToRed, setChangeColorToRed] = useState<number>(1000);
    const [changeFlexDir, setChangeFlexDir] = useState(true);

    useEffect(() => {
        setInfoFromServer();
        checkIfThereAreImg();
    }, [numOfQuestion]);

    const checkIfThereAreImg = () => {
        for (let i = 0; i < answers.length; i++) {
            if (answers[i].url) {
                setChangeFlexDir(false);
            }
        }
    }

    const setInfoFromServer: () => Promise<void> = async () => {
        let copyAnswers = { ...answers };
        let copyQuestion = { ...question };
        await fetch(`#`)
            .then((res) => res.json)
            .then((data) => {
                console.log("hiiiii");
                // copyAnswers = data.answers;
                // copyQuestion = data.questions;
                // setAnswers(copyAnswers);
                // setQuestion(copyQuestion);
                // setQuantityOfQuestion(Quantity);
                // culcWidthOfRec();
            })
            .catch((err) => {
                console.log(err, "catch");
            })
    }

    const culcWidthOfRec = () => {
        let widthOfScreen = 82.5;
        let temp = widthOfScreen / quantityOfQuestion;
        let numToPushToState = temp * numOfQuestion;
        setScoreRecWidth(numToPushToState);
    }

    const checkIfCorrect = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number) => {
        let copyOfNumOfQuestion = numOfQuestion;
        if (answers[index].isCorrect) {
            console.log("correct");
            mooveToNextQuestion();
        } else {
            console.log("incorrect");
            // make the Question red or something
            funcForChangeColorToGreen();
            funcForChangeColorToRed(index);
            setTimeout(mooveToNextQuestion, 500);
        }
    }

    const mooveToNextQuestion = () => {
        let copyOfNumOfQuestion = numOfQuestion;
        copyOfNumOfQuestion++;
        setNumOfQuestion(copyOfNumOfQuestion);
    }

    const funcForChangeColorToRed = (index: number) => {
        let holderBool = index;
        setChangeColorToRed(holderBool);
    }

    const funcForChangeColorToGreen = () => {
        let correctAnsIndex: number;
        for (let i = 0; i < answers.length; i++) {
            if (answers[i].isCorrect) {
                correctAnsIndex = i;
                setChangeColorToGreen(correctAnsIndex);
                break;
            }
        }
    }

    const renderMap = () => {
        return answers.map((answer, index) => {
            return (
                <button className={
                    !answers[0].url ? 'ans-button-no-img'
                        : 'ans-button-with-img'
                }
                    key={index} style={{
                        backgroundColor: changeColorToRed === index
                            ? '#F28787'
                            : changeColorToGreen === index
                                ? '#80DCC9'
                                : '#0C32490A'
                    }}
                    onClick={(e) => checkIfCorrect(e, index)} >
                    <p id='answer-button'>{answer.ans}</p>
                    {answer.url ? <img className="button-img"
                        src={`${answer.url}`} alt="picture that connected to question" /> : null}</button>
            )
        })
    }

    return (
        <div>
            {/* <header>
                <div>
                    <button>יצירת חידון</button><hr />
                    <button>החידונים שלי</button><hr />
                    <button>אודות</button>
                </div>
                <div>
                    <img className=""
                        src={`#`} alt="banan picture" />
                </div>
            </header>
            <hr /> */}
            {/* <img className=""
                    src={`#`} alt="Picture of right leaves" /> */}
            {/* <button>חזרה לעריכה</button> */}
            <main className='main-QuastionTemp'>
                <div
                    id='score-rectangle' style={{ width: `${scoreRecWidth}rem` }}>
                </div>
                <div className='numOfQuestion-place'>
                    <div className='numOfQuestion'>
                        <p>
                            שאלה {quantityOfQuestion}/{numOfQuestion}
                        </p>
                    </div>
                </div>
                <div>
                    <div className='question-place-father'>
                        <div >
                            <div className='question-img-place'>
                                <img id='question-img' src={`${question.url}`} alt="pic of something that connected to the question" />
                            </div>
                            <h2 id='questionTitle'>{question.questionTitle}</h2>
                            <hr id='hr' />
                            {changeFlexDir ? <div className='button-place-one'>
                                {renderMap()}
                            </div> :
                                <div className='button-place-two'>
                                    {renderMap()}
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </main>
            {/* <img className=""
                    src={`#`} alt="Picture of left leaves" /> */}
        </div>
    );
}

export default QuastionTemp;
