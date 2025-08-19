import { Group } from '@mui/icons-material'
import { Box, Button, Paper, Typography } from '@mui/material'
import { NavLink } from 'react-router'

function HomePage() {
    return (
        <Paper
            sx={{
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
                alignItems: 'center',
                alignContent: 'center',
                justifyContent: 'center',
                height: '100vh',
                backgroundImage: 'linear-gradient(135deg,#182a73 0%, #218aae 69%, #20a7ac 89%)'
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    alignContent: 'center',
                    gap: 6,
                    color: 'white',
                    flexDirection: 'column',
                }}
            >
                <Typography variant='h1'>
                  <Group sx={{ height: 110, width: 110 }} />  Reactivities
                </Typography>
                <Typography variant='h2'>
                    Welcom to reactivities
                </Typography>
                <Button component={NavLink}
                    to={'/activities'}
                    size='large'
                    variant='contained'
                    sx={{ height: 80, borderRadius: 4, fontSize: '1.5rem' }}
                >
                    Take me to the activities
                </Button>
            </Box>
        </Paper>
    )
}

export default HomePage