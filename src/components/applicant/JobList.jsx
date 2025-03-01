import React from 'react';
import { useQuery } from 'react-query';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Box,
} from '@mui/material';
import { jobService } from '../../services/job.service';

const JobList = () => {
  const { data: jobs, isLoading, error } = useQuery('jobs', jobService.getJobs);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading jobs</div>;

  return (
    <Grid container spacing={3}>
      {jobs.map((job) => (
        <Grid item xs={12} md={6} key={job.id}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2">
                {job.title}
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                {job.company}
              </Typography>
              <Typography variant="body2" component="p">
                {job.description}
              </Typography>
              <Box mt={2}>
                <Chip label={job.experienceLevel} color="primary" />
                <Chip label={job.employmentType} color="secondary" />
              </Box>
              <Box mt={2}>
                <Button variant="contained" color="primary">
                  Apply Now
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default JobList;