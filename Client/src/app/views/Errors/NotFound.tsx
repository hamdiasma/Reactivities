import { SearchOff } from "@mui/icons-material"
import { Button, Paper, Typography } from "@mui/material"
import { Link } from "react-router"

function NotFound() {
  return (
    <Paper
    sx={{
        height:400,
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        p:6
    }}
    >
      <SearchOff sx={{fontSize:100}} color="primary"/>
      <Typography gutterBottom variant="h3">
        Oops - we coud not find what yo are looking
      </Typography>
      <Button fullWidth component={Link} to="/activities">Return to activities page</Button>
    </Paper>
  )
}

export default NotFound