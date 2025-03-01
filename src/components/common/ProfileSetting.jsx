import React, { useState } from 'react';
import {
  Container,
  Paper,
  Grid,
  TextField,
  Button,
  Typography,
  Box,
  Avatar,
  Divider,
  MenuItem,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../context/AuthContext';
import { DEVELOPER_LEVELS } from '../../utils/constants';

const validationSchema = Yup.object({
  fullName: Yup.string().required('Full name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().matches(/^\+?[\d\s-]+$/, 'Invalid phone number'),
  bio: Yup.string().max(500, 'Bio must be at most 500 characters'),
  skills: Yup.string().required('Skills are required'),
  githubProfile: Yup.string().url('Must be a valid URL'),
  linkedinProfile: Yup.string().url('Must be a valid URL'),
});

const ProfileSettings = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const formik = useFormik({
    initialValues: {
      fullName: user?.fullName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      bio: user?.bio || '',
      skills: user?.skills?.join(', ') || '',
      developerLevel: user?.developerLevel || '',
      githubProfile: user?.githubProfile || '',
      linkedinProfile: user?.linkedinProfile || '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await updateProfile({
          ...values,
          skills: values.skills.split(',').map(skill => skill.trim()),
        });
        setIsEditing(false);
      } catch (error) {
        console.error('Profile update failed:', error);
      }
    },
  });

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Box display="flex" alignItems="center" mb={4}>
          <Avatar
            sx={{ width: 100, height: 100, mr: 3 }}
            src={user?.profilePicture}
          />
          <Box>
            <Typography variant="h5" gutterBottom>
              Profile Settings
            </Typography>
            <Typography color="textSecondary">
              Manage your personal information and preferences
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 4 }} />

        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="fullName"
                label="Full Name"
                disabled={!isEditing}
                {...formik.getFieldProps('fullName')}
                error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                helperText={formik.touched.fullName && formik.errors.fullName}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="email"
                label="Email"
                disabled={!isEditing}
                {...formik.getFieldProps('email')}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="phone"
                label="Phone"
                disabled={!isEditing}
                {...formik.getFieldProps('phone')}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                name="developerLevel"
                label="Developer Level"
                disabled={!isEditing}
                {...formik.getFieldProps('developerLevel')}
                error={formik.touched.developerLevel && Boolean(formik.errors.developerLevel)}
                helperText={formik.touched.developerLevel && formik.errors.developerLevel}
              >
                {Object.values(DEVELOPER_LEVELS).map((level) => (
                  <MenuItem key={level} value={level}>
                    {level}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                name="bio"
                label="Bio"
                disabled={!isEditing}
                {...formik.getFieldProps('bio')}
                error={formik.touched.bio && Boolean(formik.errors.bio)}
                helperText={formik.touched.bio && formik.errors.bio}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                name="skills"
                label="Skills (comma-separated)"
                disabled={!isEditing}
                {...formik.getFieldProps('skills')}
                error={formik.touched.skills && Boolean(formik.errors.skills)}
                helperText={formik.touched.skills && formik.errors.skills}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="githubProfile"
                label="GitHub Profile"
                disabled={!isEditing}
                {...formik.getFieldProps('githubProfile')}
                error={formik.touched.githubProfile && Boolean(formik.errors.githubProfile)}
                helperText={formik.touched.githubProfile && formik.errors.githubProfile}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="linkedinProfile"
                label="LinkedIn Profile"
                disabled={!isEditing}
                {...formik.getFieldProps('linkedinProfile')}
                error={formik.touched.linkedinProfile && Boolean(formik.errors.linkedinProfile)}
                helperText={formik.touched.linkedinProfile && formik.errors.linkedinProfile}
              />
            </Grid>

            <Grid item xs={12}>
              <Box display="flex" gap={2}>
                {isEditing ? (
                  <>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                    >
                      Save Changes
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="contained"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Profile
                  </Button>
                )}
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default ProfileSettings;