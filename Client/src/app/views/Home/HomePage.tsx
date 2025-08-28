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
    gap: { xs: 3, sm: 4, md: 6 }, // smaller gaps on small screens
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    textAlign: 'center',
    px: 2, // padding for small devices
    backgroundImage:
      'linear-gradient(135deg,#182a73 0%, #218aae 69%, #20a7ac 89%)',
  }}
>
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: { xs: 3, md: 6 },
      color: 'white',
      flexDirection: 'column',
      maxWidth: '800px',
      width: '100%',
    }}
  >
    <Typography
      variant="h1"
      sx={{
        fontSize: { xs: '2rem', sm: '3rem', md: '4rem' }, // responsive font sizes
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        flexWrap: 'wrap', // prevents overflow on small screens
      }}
    >
      <Group sx={{ height: { xs: 60, sm: 80, md: 110 }, width: { xs: 60, sm: 80, md: 110 } }} />{' '}
      Reactivities
    </Typography>

    <Typography
      variant="h2"
      sx={{ fontSize: { xs: '1.25rem', sm: '2rem', md: '2.5rem' } }}
    >
      Welcome to reactivities
    </Typography>

    <Button
      component={NavLink}
      to={'/activities'}
      size="large"
      variant="contained"
      sx={{
        height: { xs: 50, sm: 65, md: 80 },
        borderRadius: 4,
        fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
        px: { xs: 2, sm: 4, md: 6 },
        whiteSpace: 'normal',
        lineHeight: 1.2,
      }}
    >
      Take me to the activities
    </Button>
  </Box>
</Paper>

    )
}

export default HomePage