import { Box, Container } from "@mui/material";
import NavBar from "./NavBar";
import { Outlet } from "react-router";

function App() {

  return (
    <Box bgcolor={"#eee"} minHeight={'100vh'} >
      <NavBar/>
      <Container maxWidth="xl" sx={{ paddingTop: '80px' }}>
        <Outlet/>
      </Container>
    </Box>
  )
}

export default App
