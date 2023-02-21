import React from 'react';

interface IProps {
    description: string
}

const CreateGameHeader: React.FC<IProps> = ({ description }) => {
    return (
        <div>
            <img className=""
                src={`./img/monkey.svg`} alt="monkey img" />
            <p>{description}</p>
            <img className=""
                src={`./img/arrow-back.svg`} alt="arrow img" />
        </div>
    );
}

export default CreateGameHeader;