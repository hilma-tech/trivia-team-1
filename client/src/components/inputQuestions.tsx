import { IconButton, TextField } from "@mui/material";
import React, { FC, useState } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CheckBoxSvg from '../images/checkicon.svg';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import Selectimage from '../images/image.svg'
import TrashSvg from '../images/trash.svg'


const theme = createTheme({
    direction: 'rtl', // Both here and <body dir="rtl">
});
// Create rtl cache
const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [rtlPlugin],
});


const MakeQuestion: FC<{ isChecked?: boolean }> = ({ isChecked }) => {
    const [checked, setChecked] = useState<boolean>(Boolean(isChecked));

    const handleCheckboxClick = () => {
        setChecked(!checked);
    };
    return (
        <CacheProvider value={cacheRtl}>
            <div className="checkboxesContanier" dir='rtl'>
                <div className="checkboxSvg">
                    <IconButton onClick={handleCheckboxClick} style={{ borderRadius: '50%', border: '1px solid black', width: '1vw', height: '1vh' }} >
                        <img src={CheckBoxSvg} className="iconBtnSvg" style={{ visibility: checked ? 'visible' : 'hidden' }} />
                    </IconButton>
                </div>
                <div className="textFieldContainer">
                    <TextField label="תשובה 1" id="standard-size-small" defaultValue="Small" size="small" variant="standard" />
                </div>

                <IconButton style={{ width: '2vw' }}>
                    <img src={Selectimage} className="slectImageSvgForQuestions" />
                </IconButton>
                <IconButton>
                    <img src={TrashSvg} className="trashSvgForQuestions" />
                </IconButton>
            </div>
        </CacheProvider>
    )

}

export default MakeQuestion;