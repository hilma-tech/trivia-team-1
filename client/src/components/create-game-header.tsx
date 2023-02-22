import React from 'react';

interface CreateGameHeaderProps {
    description: string
}

const CreateGameHeader: React.FC<CreateGameHeaderProps> = ({ description }) => {
    return (
        <div>
            <img 
                src={'./img/monkey.svg'} alt="monkey img"
            />
            <p>
                {description}
            </p>
            <img 
                src={'./img/arrow-back.svg'} alt="arrow img"
            />
        </div>
    );
}

export default CreateGameHeader;