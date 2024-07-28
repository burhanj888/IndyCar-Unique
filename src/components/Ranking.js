import React, { useEffect, useState } from 'react';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, CssBaseline, AppBar, Toolbar, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import leaderboard from '../assets/leaderboard.json';

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
    body2: {
      color: '#757575',
    },
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: '#0D47A1',
          color: '#FFFFFF',
          fontWeight: 'bold',
        },
        body: {
          fontSize: 14,
        },
      },
    },
  },
});

const Leaderboard = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load data from JSON and sort by time
    const sortedData = leaderboard.sort((a, b) => {
      const timeA = parseFloat(a.time.replace(':', '.'));
      const timeB = parseFloat(b.time.replace(':', '.'));
      return timeA - timeB;
    });
    setData(sortedData);
  }, []);

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Leaderboard
          </Typography>
          <Button color="inherit" onClick={handleBackToHome}>Back to Home</Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Typography variant="h2" gutterBottom align="center" style={{ margin: '40px 0' }}>
          Top Racers Leaderboard
        </Typography>
        <TableContainer component={Paper} style={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Rank</TableCell>
                <TableCell align="center">Racer</TableCell>
                <TableCell align="center">Car</TableCell>
                <TableCell align="center">Company</TableCell>
                <TableCell align="center">Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <motion.tr
                  key={row.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{row.racer}</TableCell>
                  <TableCell align="center">{row.car}</TableCell>
                  <TableCell align="center">{row.company}</TableCell>
                  <TableCell align="center">{row.time}</TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </ThemeProvider>
  );
};

export default Leaderboard;
