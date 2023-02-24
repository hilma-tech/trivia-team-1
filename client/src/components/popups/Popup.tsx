import { Button, Link } from "@mui/material"
import { FC } from "react"
import { useContext } from "react"
import '../../style/popups.scss'

const Popup: FC<{ type: string }> = ({ type }) => {
    return (
        <>
            <div className="popupContainer">
                {/* copy pop up */}
                {/* {(type === 'copyQuiz') && <div>
                    <h2>הקישור הועתק</h2>
                    <p>מצוין! עכשיו אתה יכול לשתף את החידון שלך עם חברים</p>

                    <div className="popupConfirmBtnDiv">
                        <Button variant="contained" color="primary">אישור</Button>
                    </div>
                </div>} */}

                {(type === 'changeQuiz' || type === 'deleteQuiz') && <div>
                    {/* change quizz pop up*/}
                    {type === 'changeQuiz' &&
                        <div>
                            <h2>שים לב</h2>
                            <p>אם תשמור את השינויים לוח התוצאות שלך יתאפס</p>
                        </div>
                    }
                    {/* delete quizz pop up*/}
                    {type === 'deleteQuiz' &&
                        <div>
                            <h2>האם אתה בטוח?</h2>
                            <p>אם תמחק את החידון לא יהיה ניתן לשחק בו והנתונים שאספת ימחקו</p>
                        </div>
                    }

                    <div className="popupConfirmBtnDiv">
                        <Link>ביטול</Link>
                        <Button variant="contained" color="primary">אישור</Button>
                    </div>
                </div>}
            </div>
            <div className="fullPageShadow">
            </div>
        </>
    )
}

export default Popup