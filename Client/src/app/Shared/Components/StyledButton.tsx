import { Button, styled, type ButtonProps } from "@mui/material";
import type { LinkProps } from "react-router";


type Props = ButtonProps | LinkProps


const StyledButton = styled(Button)<Props>(({ theme }) => ({
  '&.Mui-disabled': {
    backgroundColor:theme.palette.grey[600],
    color:theme.palette.text.disabled
  },
  
}));

export default StyledButton