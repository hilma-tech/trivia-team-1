import React from 'react';
import '../css/EditQuiz.scss'
import LeftLeaf from '../images/leftleaf.svg'
import RightLeaf from '../images/rightleaf.svg'


function EditQuiz() {
    return (
        <>
            <div className='leftleafContainer'>
                <img className='leftleaf' src={LeftLeaf} alt="left leaf" />
                <img className='rightleaf' src={RightLeaf}  alt="right leaf" />

            </div>
        </> 
    );
}

export default EditQuiz;