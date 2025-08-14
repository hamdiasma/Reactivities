import { MenuItem } from "@mui/material";
import { NavLink } from "react-router";

interface IProps {
    children: React.ReactNode;
    to: string;
}

function MenueItemLink({ children, to }: IProps) {
    return (
        <MenuItem
            component={NavLink}
            to={to}
            sx={{
                display: { xs: 'none', sm: 'block' },
                color:"inherit",
                '&.active': {
                    color: 'yellow',
                }
            }}
        >
            {children}
        </MenuItem>)
}

export default MenueItemLink