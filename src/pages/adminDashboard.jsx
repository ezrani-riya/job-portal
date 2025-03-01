import React from 'react';
import { useQuery } from 'react-query';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { jobService } from '../services/job.service';
import { formatDate } from '../utils/helpers';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { data: jobs, isLoading } = useQuery('jobs', jobService.getJobs);
  const { data: applications } = useQuery('applications', () => 
    jobService.getAllApplications()
  );

  const stats = {
    totalJobs: jobs?.length || 0,
    activeJobs: jobs?.filter(job => new Date(job.deadline) > new Date()).length || 0,
    totalApplications: applications?.length || 0,
    pendingReviews: applications?.filter(app => app.status === 'pending').length || 0,
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Stats Overview */}
      <Grid container spacing={3} mb={4}>
        {Object.entries(stats).map(([key, value]) => (
          <Grid item xs={12} sm={6} md={3} key={key}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h4" color="primary">
                {value}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Job Listings Management */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6">Job Listings</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/admin/jobs/create')}
          >
            Post New Job
          </Button>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Level</TableCell>
                <TableCell>Applications</TableCell>
                <TableCell>Deadline</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {jobs?.map((job) => (
                <TableRow key={job.id}>
                  <TableCell>{job.title}</TableCell>
                  <TableCell>{job.experienceLevel}</TableCell>
                  <TableCell>{job.applicationCount || 0}</TableCell>
                  <TableCell>{formatDate(job.deadline)}</TableCell>
                  <TableCell>
                    <Chip
                      label={new Date(job.deadline) > new Date() ? 'Active' : 'Expired'}
                      color={new Date(job.deadline) > new Date() ? 'success' : 'error'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      onClick={() => navigate(`/admin/jobs/${job.id}`)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default AdminDashboard;