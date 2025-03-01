import React from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Chip,
  Button,
} from '@mui/material';
import { useQuery } from 'react-query';
import { useAuth } from '../context/AuthContext';
import { jobService } from '../services/job.service';

const ApplicantDashboard = () => {
  const { user } = useAuth();
  const { data: applications, isLoading } = useQuery(
    'applications',
    () => jobService.getUserApplications(user.id)
  );

  const getStatusColor = (status) => {
    const colors = {
      pending: 'warning',
      accepted: 'success',
      rejected: 'error',
      'under-review': 'info',
    };
    return colors[status] || 'default';
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {/* Profile Summary */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Profile Summary
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body1">
                <strong>Name:</strong> {user?.fullName}
              </Typography>
              <Typography variant="body1">
                <strong>Level:</strong> {user?.developerLevel || 'Not Assigned'}
              </Typography>
              <Typography variant="body1">
                <strong>Status:</strong>{' '}
                <Chip
                  size="small"
                  label={user?.status || 'Active'}
                  color="primary"
                />
              </Typography>
            </Box>
            <Button variant="outlined" fullWidth>
              Edit Profile
            </Button>
          </Paper>
        </Grid>

        {/* Applications */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              My Applications
            </Typography>
            {isLoading ? (
              <Typography>Loading applications...</Typography>
            ) : (
              <List>
                {applications?.map((application) => (
                  <ListItem
                    key={application.id}
                    divider
                    secondaryAction={
                      <Chip
                        label={application.status}
                        color={getStatusColor(application.status)}
                      />
                    }
                  >
                    <ListItemText
                      primary={application.jobTitle}
                      secondary={`Applied on: ${new Date(
                        application.appliedDate
                      ).toLocaleDateString()}`}
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ApplicantDashboard;