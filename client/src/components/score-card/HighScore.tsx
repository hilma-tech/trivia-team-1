import { TableCell, TableRow } from "@mui/material";
import { PropsObj } from "./interfaces";
import gold from '../../images/crowns/gold.svg';
import silver from '../../images/crowns/silver.svg';
import bronze from '../../images/crowns/bronze.svg';

function HighScore(props: PropsObj) {
    let { player, score, date } = props.score;
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
            <TableCell>{<p>{player} <img src={src} alt={src} /></p>}</TableCell>
            <TableCell className="bolder">{score}</TableCell>
            <TableCell>{date}</TableCell>
        </TableRow>
    );
}

export default HighScore;