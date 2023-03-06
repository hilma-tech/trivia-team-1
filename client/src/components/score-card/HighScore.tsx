import { TableCell, TableRow } from "@mui/material";
import { PropsObj } from "./interfaces";
import gold from '../../images/crowns/gold.svg';
import silver from '../../images/crowns/silver.svg';
import bronze from '../../images/crowns/bronze.svg';

function HighScore(props: PropsObj) {
    const newDate = new Date(props.score.date);
    const formattedDate = `${(newDate.getMonth() + 1).toString().padStart(2, '0')}/${newDate.getDate().toString().padStart(2, '0')}/${newDate.getFullYear().toString().slice(-2)}`;
    const rank = props.index + 1
    let src;
    switch (rank) {
        case 1:
            src = gold
            break;
        case 2:
            src = silver
            break;
        case 3:
            src = bronze
            break;
    }

    return (
        <TableRow>
            <TableCell className="bold">{rank}</TableCell>
            <TableCell>{<p>{props.score.player} <img src={src} alt={src} /></p>}</TableCell>
            <TableCell className="bolder">{props.score.score}</TableCell>
            <TableCell>{formattedDate}</TableCell>
        </TableRow>
    );
}

export default HighScore;