import { Box, Typography, Container, useTheme, useMediaQuery } from '@mui/material';
import { ButtonHandler } from '../components/Button.jsx';

export const Hero = () => {

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>

    <Container maxWidth={false}  sx={{backgroundColor: theme.palette.background.paper, display: "flex", justifyContent: "space-between", marginTop: 1}}>
      <Box sx={{
        padding: "4%",
        mr: 2,
        textAlign: 'left', 
        color: theme.palette.primary.main,
        mt: 3,
        width: "100%"
      
      }}>
        <Typography variant="h3" component="h1" sx={{
          fontFamily: '"Vollkorn SC", Arial, sans-serif',
          fontWeight: 'bold', 
          letterSpacing: 1,
          fontSize: {xs: "2.5rem", sm: "3rem"} 
        }}>
          ELEVATE YOUR <span style={{color: theme.palette.text.secondary}}>SPORTS PASSION</span>
        </Typography>
        <Typography variant="h3" sx={{
          fontFamily: '"Vollkorn SC", Arial, sans-serif',
          fontWeight: 'bold', 
          mb: 3, 
          letterSpacing: 2,
          fontSize: {xs: "2.5rem", sm: "3rem"} 
          // color: 'rgba(255, 255, 255, 0.7)', 
        }}>
          BEYOND BOUNDARIES
        </Typography>
        
       {
        !isSmall ? null :  
        <Container  sx={{mb:"20px", display: "flex", justifyContent:"center", alignItems: "center",  maxWidth: "100%", overflow: "hidden"}}>
          <img  src="https://i.ibb.co/PTVS5Rn/landingpage.png" alt="climbing activity" />
        </Container>
       }
        <Typography variant="body1" sx={{
          fontFamily: '"Vollkorn SC", Arial, sans-serif',
          fontWeight: 'light',
          mb: 6,
        }}
        // eslint-disable-next-line
        >"Compete with the best, train with the best, and become the best. At our sports union, you'll not only master your sport but also meet peers from around the globe. Discover new cultures, forge lasting friendships, and achieve greatness. Join us and make memories that will last a lifetime — this is where champions are made and horizons are expanded!"
        </Typography>
        <ButtonHandler title="Sign Up" link="/signUp"  py="0.5" color="secondary" />
        <ButtonHandler title="Sign In" link="/signIn"  py="0.5" color="primary" />
      </Box>
      {
        isSmall ? null :  
        <Container  sx={{mb:"20px", display: "flex", justifyContent:"center", alignItems: "center",  maxWidth: "100%", overflow: "hidden"}}>
          <img height="70%" width="80%" src="https://i.ibb.co/Vp14SXD/climbing.jpg" alt="climbing activity" />
        </Container>
       }

      

    </Container>
    </>

  );
};
