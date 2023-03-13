import styled from "@emotion/styled";
import { Tooltip, tooltipClasses, TooltipProps } from "@mui/material";



const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
        color: 'rgb(0, 0, 0, 0)'
    },
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: 'rgb(0, 0, 0)'
    },
}));

export default BootstrapTooltip;