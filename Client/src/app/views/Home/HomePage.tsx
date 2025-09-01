import { Group } from '@mui/icons-material';
import { Box, Button, Paper, Typography, keyframes } from '@mui/material';
import { NavLink } from 'react-router';
import ParallaxCarousel from '../../Shared/Components/Carousel';

// Define keyframes for animations
const fadeUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(40px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const scaleIn = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

function HomePage() {
  return (
    <Paper
      sx={{
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: 3, sm: 4, md: 6 },
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
        px: 2,
        backgroundImage:
          'linear-gradient(135deg,#182a73 0%, #218aae 69%, #20a7ac 89%)',
      }}
    >
            <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '2rem', sm: '3rem', md: '4rem' },
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            flexWrap: 'wrap',
            animation: `${scaleIn} 0.8s ease-out`,
          }}
        >
          <Group
            sx={{
              height: { xs: 60, sm: 80, md: 110 },
              width: { xs: 60, sm: 80, md: 110 },
              animation: `${fadeUp} 1s ease-out`,
            }}
          />{' '}
          Reactivities
        </Typography>
      <Box
        sx={{
          width: '100%',
          maxWidth: 1200,
          mb: { xs: 4, md: 6 },
          animation: `${fadeUp} 1s ease-out`,
        }}
      >
        <ParallaxCarousel />
      </Box>

      {/* Text Section */}
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
          variant="h2"
          sx={{
            fontSize: { xs: '1.25rem', sm: '2rem', md: '2.5rem' },
            animation: `${fadeUp} 1s ease-out 0.5s`,
            opacity: 0,
            animationFillMode: 'forwards',
          }}
        >
          Welcome to Reactivities
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
            animation: `${fadeUp} 1s ease-out 1s`,
            opacity: 0,
            animationFillMode: 'forwards',
            background: 'linear-gradient(45deg, #218aae, #20a7ac)',
            boxShadow: '0px 6px 20px rgba(0,0,0,0.3)',
            '&:hover': {
              background: 'linear-gradient(45deg, #20a7ac, #218aae)',
              transform: 'scale(1.05)',
            },
          }}
        >
          Take me to the activities
        </Button>
      </Box>
    </Paper>
  );
}

export default HomePage;
