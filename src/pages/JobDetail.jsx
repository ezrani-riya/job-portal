import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Chip,
  Button,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Check, WorkOutline, Timer, School } from '@mui/icons-material';
import { useQuery } from 'react-query';
import { jobService } from '../services/job.service';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: job, isLoading } = useQuery(['job', id], () =>
    jobService.getJobById(id)
  );

  if (isLoading) return <div>Loading...</div>;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" gutterBottom>
              {job.title}
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Chip
                icon={<WorkOutline />}
                label={job.experienceLevel}
                sx={{ mr: 1 }}
              />
              <Chip
                icon={<Timer />}
                label={job.employmentType}
                sx={{ mr: 1 }}
              />
              <Chip
                icon={<School />}
                label={`Level ${job.requiredLevel}`}
              />
            </Box>

            <Typography variant="h6" gutterBottom>
              Job Description
            </Typography>
            <Typography paragraph>{job.description}</Typography>

            <Typography variant="h6" gutterBottom>
              Requirements
            </Typography>
            <List>
              {job.requirements.map((req, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <Check color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={req} />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default JobDetails;