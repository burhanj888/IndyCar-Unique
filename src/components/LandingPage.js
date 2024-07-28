import React from 'react';
import { Container, Grid, Card, CardContent, Typography, CardActionArea, CssBaseline, CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import racingCarGif from '../assets/racing-car.gif';
import racingGameImage from '../assets/race.png';
import carExchangeImage from '../assets/exchange.png';
import generateCarImage from '../assets/skin.png';
import raceDashboardImage from '../assets/ranking.png';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0D47A1',
    },
    secondary: {
      main: '#FF8F00',
    },
  },
  typography: {
    h2: {
      fontWeight: 600,
      color: '#0D47A1',
    },
    h5: {
      fontWeight: 500,
    },
    body2: {
      color: '#757575',
    },
  },
});

const LandingPage = () => {
  const navigate = useNavigate();

  const handleCardClick = (path) => {
    navigate(path);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const cards = [
    { title: 'Racing Game', description: 'Start and manage your races.', path: '/racing-game', image: racingGameImage },
    { title: 'Car Exchange', description: 'Buy and sell car ownership.', path: '/car-exchange', image: carExchangeImage },
    { title: 'Generate Skin', description: 'Use AI to generate new skins for car.', path: '/generate-car', image: generateCarImage },
    { title: 'Leaderboard', description: 'View race statistics and details.', path: '/leaderboard', image: raceDashboardImage },
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        maxWidth={false}
        style={{
          backgroundImage: `url(${racingCarGif})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h2" gutterBottom align="center" style={{ margin: '40px 0', color: '#FFFFFF' }}>
          Car Racing Game Dashboard
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {cards.map((card, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card style={{ backgroundColor: 'white', opacity: '80%' }}>
                  <CardActionArea onClick={() => handleCardClick(card.path)}>
                    <CardMedia 
                    component="img" 
                    style={{ width: '150px', height: '150px', margin: '20px auto' }}
                    image={card.image} 
                    alt={card.title} />
                    <CardContent>
                      <Typography variant="h5" color="primary">{card.title}</Typography>
                      <Typography variant="body2">{card.description}</Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default LandingPage;
