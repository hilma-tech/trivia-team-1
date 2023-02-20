import React from 'react';
import '../css/EditQuiz.scss'
import LeftLeaf from '../images/leftleaf.svg'
import RightLeaf from '../images/rightleaf.svg'
import ShowQuizBtn from '../images/showquizzbtn.svg'
import LinkBtn from '../images/linkBtn.svg'
import saveBtn from '../images/saveBtn.svg'
import Selectimage from '../images/image.svg'
import MakeQuestion from './inputQuestions'
import { TRUE } from 'sass';



function EditQuiz() {
    return (
        <>
            <div className='leftleafContainer'>
                <img className='leftleaf' src={LeftLeaf} alt="left leaf" />
                <img className='rightleaf' src={RightLeaf} alt="right leaf" />
            </div>
            <div className='formContanier'>
                <div className='topContainer'>
                    <div className='topButtonsContainer'>
                        <div className='topRightbtn'>
                            <button className='showQuizBtn'>
                                צפייה בחידון
                                <img className='ShowQuizSvg' src={ShowQuizBtn} />
                            </button>
                        </div>
                        <div className='topLeftBtn'>
                            <button className='saveBtn'>
                                שמירה
                                <img className='saveBtnSvg' src={saveBtn} />
                            </button>
                            <button className='linkbtn'><img className='linkBtnSvg' src={LinkBtn} /></button>
                        </div>
                    </div>
                </div>
                <div className='quizHeaderContainer'>
                    <div className='quizHeaderImage'> <img className='selectImageQuizSvg' src={Selectimage} /></div>
                    <div className='titleHeaderContainer'>
                        <h1>חידון ללא כותרת</h1>
                        <p>תיאור חידון</p>
                    </div>
                </div>
                <div className='addQutionsContainer'>
                    <div className='darganddropContainer'><button></button></div>
                    <div className='quizQuestionsContainer'>
                        <div className='quizQuestions' >
                            <p>שאלה ללא כותרת</p>
                            <img className='selectImageQutionsSvg' src={Selectimage} />
                        </div>
                        <div>
                            <MakeQuestion />
                            <MakeQuestion isChecked={true} />
                           
                        </div>
                    </div>
                    <div></div>
                </div>
            </div>
        </>
    );
}

export default EditQuiz;