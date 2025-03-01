import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Grid,
  MenuItem,
  Box,
} from '@mui/material';
import { jobService } from '../../services/job.service';
import { DEVELOPER_LEVELS, EMPLOYMENT_TYPES } from '../../utils/constants';

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  experienceLevel: Yup.string().required('Experience level is required'),
  employmentType: Yup.string().required('Employment type is required'),
  requiredSkills: Yup.string().required('Required skills are required'),
  deadline: Yup.date()
    .min(new Date(), 'Deadline must be in the future')
    .required('Deadline is required'),
});

const JobPostForm = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      experienceLevel: '',
      employmentType: '',
      requiredSkills: '',
      deadline: '',
      requirements: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await jobService.createJob({
          ...values,
          requiredSkills: values.requiredSkills.split(',').map(skill => skill.trim()),
          requirements: values.requirements.split('\n').filter(req => req.trim()),
        });
        navigate('/admin/jobs');
      } catch (error) {
        console.error('Failed to create job:', error);
      }
    },
  });

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Post New Job
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="title"
                label="Job Title"
                value={formik.values.title}
                onChange={formik.handleChange}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                name="description"
                label="Job Description"
                value={formik.values.description}
                onChange={formik.handleChange}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                name="experienceLevel"
                label="Experience Level"
                value={formik.values.experienceLevel}
                onChange={formik.handleChange}
                error={formik.touched.experienceLevel && Boolean(formik.errors.experienceLevel)}
                helperText={formik.touched.experienceLevel && formik.errors.experienceLevel}
              >
                {Object.values(DEVELOPER_LEVELS).map((level) => (
                  <MenuItem key={level} value={level}>
                    {level}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                name="employmentType"
                label="Employment Type"
                value={formik.values.employmentType}
                onChange={formik.handleChange}
                error={formik.touched.employmentType && Boolean(formik.errors.employmentType)}
                helperText={formik.touched.employmentType && formik.errors.employmentType}
              >
                {Object.values(EMPLOYMENT_TYPES).map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                name="requiredSkills"
                label="Required Skills (comma-separated)"
                value={formik.values.requiredSkills}
                onChange={formik.handleChange}
                error={formik.touched.requiredSkills && Boolean(formik.errors.requiredSkills)}
                helperText={formik.touched.requiredSkills && formik.errors.requiredSkills}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                name="requirements"
                label="Requirements (one per line)"
                value={formik.values.requirements}
                onChange={formik.handleChange}
                error={formik.touched.requirements && Boolean(formik.errors.requirements)}
                helperText={formik.touched.requirements && formik.errors.requirements}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                type="date"
                name="deadline"
                label="Application Deadline"
                InputLabelProps={{ shrink: true }}
                value={formik.values.deadline}
                onChange={formik.handleChange}
                error={formik.touched.deadline && Boolean(formik.errors.deadline)}
                helperText={formik.touched.deadline && formik.errors.deadline}
              />
            </Grid>

            <Grid item xs={12}>
              <Box display="flex" gap={2}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  size="large"
                >
                  Post Job
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/admin/jobs')}
                  size="large"
                >
                  Cancel
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default JobPostForm;