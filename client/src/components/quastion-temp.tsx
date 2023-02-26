import { type } from 'os';
import React, { useState, useEffect, useMemo } from 'react';
import '../style/QuastionTemp.scss';

interface QuastionTempState {
    answers: {
        ans: string,
        url: string,
        isCorrect: boolean
    }[][],
    question: {
        questionTitle: string,
        url: string
    }[],
}


const QuastionTemp = () => {
    const [answers, setAnswers] = useState<QuastionTempState["answers"]>([[
        { ans: "ארץ המגף", url: "https://img.mako.co.il/2021/07/07/GettyImages-51246878_re_autoOrient_i.jpg", isCorrect: true },
        { ans: "התפוח הגדול", url: "sdvsdv", isCorrect: false },
        { ans: "ארץ האגדות", url: "awvev", isCorrect: false },
        { ans: "מדינת הגמדים", url: "dvdsv", isCorrect: false }
    ], [
        { ans: "לאונרדו דה וינצ'י", url: "", isCorrect: true },
        { ans: "נועה קירל", url: "", isCorrect: false },
        { ans: "שפע יששכר", url: "", isCorrect: false },
        { ans: "לאונרד הכהן", url: "", isCorrect: false }
    ]
    ]);
    const [question, setQuestion] = useState<QuastionTempState["question"]>([
        {
            questionTitle: "איטליה מכונה גם...", url: "https://upload.wikimedia.org/wikipedia/he/e/e3/%D7%9E%D7%93%D7%99%D7%A0%D7%AA_%D7%94%D7%92%D7%9E%D7%93%D7%99%D7%9D.jpg"
        }
        ,
        {
            questionTitle: "?מי מהבאים היה איטלקי", url: "https://upload.wikimedia.org/wikipedia/he/e/e3/%D7%9E%D7%93%D7%99%D7%A0%D7%AA_%D7%94%D7%92%D7%9E%D7%93%D7%99%D7%9D.jpg"
        }
    ]);
    const [numOfQuestion, setNumOfQuestion] = useState(0);
    const [scoreRecWidth, setScoreRecWidth] = useState(30);
    const [quantityOfQuestion, setQuantityOfQuestion] = useState(10);
    const [changeColorToGreen, setChangeColorToGreen] = useState<number>(1000);
    const [changeColorToRed, setChangeColorToRed] = useState<number>(1000);
    const [changeFlexDir, setChangeFlexDir] = useState(true);

    useEffect(() => {
        setInfoFromServer();
        checkIfThereAreImg();
    }, []);

    const getActualQuestion = () => {
        return question[numOfQuestion]
    }

    const getActualAnswer = () => {
        return answers[numOfQuestion]
    }
    const checkIfThereAreImg = () => {
        for (let i = 0; i < actualAnswer.length; i++) {
            if (actualAnswer[i].url) {
                setChangeFlexDir(false);
            } else {
                setChangeFlexDir(true);
            }
        }
    }

    const actualQuestion = useMemo(() => getActualQuestion(), [numOfQuestion]);
    const actualAnswer = useMemo(() => getActualAnswer(), [numOfQuestion]);
    const doChangeFlexDir = useMemo(() => checkIfThereAreImg(), [numOfQuestion]);



    const setInfoFromServer: () => Promise<void> = async () => {
        let copyAnswers = [...answers];
        let copyQuestion = [...question];
        await fetch(`#`)
            .then((res) => res.json)
            .then((data) => {
                console.log("hiiiii");
                // copyAnswers = data.answers;
                // copyQuestion = data.questions;
                // setAnswers(copyAnswers);
                // setQuestion(copyQuestion);
                // setQuantityOfQuestion(data.questions.length);
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
        if (actualAnswer[index].isCorrect) {
            console.log("correct");
            setTimeout(mooveToNextQuestion, 500);
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
        if (copyOfNumOfQuestion < answers.length - 1) {
            copyOfNumOfQuestion++;
        }
        setNumOfQuestion(copyOfNumOfQuestion);
        setChangeColorToRed(10000);
        setChangeColorToGreen(10000);
    }

    const funcForChangeColorToRed = (index: number) => {
        let holderBool = index;
        setChangeColorToRed(holderBool);
    }

    const funcForChangeColorToGreen = () => {
        let correctAnsIndex: number;
        for (let i = 0; i < actualAnswer.length; i++) {
            if (actualAnswer[i].isCorrect) {
                correctAnsIndex = i;
                setChangeColorToGreen(correctAnsIndex);
                break;
            }
        }
    }

    const renderMap = () => {
        return actualAnswer.map((answer, index) => {
            return (
                <button className={
                    !actualAnswer[0].url ? 'ans-button-no-img'
                        : 'ans-button-with-img'
                }
                    key={index} style={{
                        backgroundColor: changeColorToRed === index
                            ? '#F28787'
                            : changeColorToGreen === index
                                ? '#80DCC9'
                                : '#0C32490A'
                    }}
                    onClick={(e) => checkIfCorrect(e, index)}
                >
                    <p className='answer-button'>
                        {answer.ans}
                    </p>
                    {answer.url ?
                        <img className="button-img"
                            src={`${answer.url}`} alt=""
                        />
                        : null}
                </button>
            )
        })
    }

    return (
        <div className='question-temp comp-children-container'>
            <main className='main-QuastionTemp'>
                <div
                    className='score-rectangle' style={{ width: `${scoreRecWidth}rem` }}>
                </div>
                <div className='numOfQuestion-place'>
                    <div className='numOfQuestion'>
                        <p>
                            שאלה {quantityOfQuestion}/{numOfQuestion}
                        </p>
                    </div>
                </div>
                <div className='question-content'>
                    <div className='question-place-father'>
                        <div className='question-place-child'>
                            <div className='question-img-place'>
                                <img className='question-img' src={`${actualQuestion.url}`}
                                    alt="pic of something that connected to the question"
                                />
                            </div>
                            <h2 id='questionTitle'>
                                {actualQuestion.questionTitle}
                            </h2>
                            <hr id='hr' />
                            <div className={changeFlexDir ?
                                 'button-place-one' 
                                 : 
                                 'button-place-two'}
                                 >
                                {renderMap()}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default QuastionTemp;
