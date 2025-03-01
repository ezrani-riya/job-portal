import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Box,
} from '@mui/material';
import { Work, School, Engineering, Timeline } from '@mui/icons-material';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Work fontSize="large" />,
      title: 'Job Opportunities',
      description: 'Browse through various engineering positions and internships',
    },
    {
      icon: <School fontSize="large" />,
      title: 'Internship Programs',
      description: 'Join our structured internship program with 8 experience levels',
    },
    {
      icon: <Engineering fontSize="large" />,
      title: 'Career Growth',
      description: 'Progress from beginner to master developer with our Gada system',
    },
    {
      icon: <Timeline fontSize="large" />,
      title: 'Skill Development',
      description: 'Continuous learning and professional development opportunities',
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" component="h1" gutterBottom>
                Build Your Engineering Career
              </Typography>
              <Typography variant="h5" paragraph>
                Join Debo Engineering and be part of innovative projects
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                onClick={() => navigate('/jobs')}
              >
                View Opportunities
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={3} key={index}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ textAlign: 'center', mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h5" component="h2" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;