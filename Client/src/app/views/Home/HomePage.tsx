import { Container, Box } from '@mui/material'

function HomePage() {
  return (
        <Box bgcolor={"#eee"} minHeight={'100vh'} > 
            <Container maxWidth="xl" sx={{ paddingTop: '80px' }}>
                <h1>Welcome to the Home Page</h1>
                <p>This is the home page of our application.</p>
            </Container>
        </Box>

  )
}

export default HomePage