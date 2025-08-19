import { Box, Container } from "@mui/material";
import NavBar from "./NavBar";
import { Outlet, useLocation } from "react-router";
import HomePage from "../views/Home/HomePage";

function App() {

  const location = useLocation()

  return (
    <Box bgcolor={"#eee"} minHeight={'100vh'} >
      {location.pathname === '/' ? <HomePage /> :
        <>
          <NavBar />
          <Container maxWidth="xl" sx={{ paddingTop: '80px' }}>
            <Outlet />
          </Container>
        </>

      }

    </Box>
  )
}

export default App
