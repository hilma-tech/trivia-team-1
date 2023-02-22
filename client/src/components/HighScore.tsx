import { TableCell, TableRow } from "@mui/material";
import gold from '../images/crowns/gold.svg'
import silver from '../images/crowns/silver.svg'
import bronze from '../images/crowns/bronze.svg'

interface ScoreType {
    score: {
        id: number
        name: string;
        score: number;
        date: Date;
    };
    i: number
}

function HighScore(props: ScoreType) {

    let { id, name, score, date } = props.score;
    let src;
    switch (props.i) {
        case 0:
            src = gold
            break;
        case 1:
            src = silver
            break;
        case 2:
            src = bronze
            break
        default:
            break;
    }

    return (
        <TableRow key={id} sx={{borderBottom:0}}>
            <TableCell align="right" component="th" scope="row">{id}</TableCell>
            <TableCell align="right">{name}</TableCell>
            <TableCell align="right">{score}</TableCell>
            <TableCell align="right">{date.toLocaleDateString()}</TableCell>
        </TableRow>
    );
}


export default HighScore;
