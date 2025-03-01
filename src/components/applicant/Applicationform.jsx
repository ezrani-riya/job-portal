import React, { useState } from 'react';
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
  Box,
  MenuItem,
  CircularProgress,
} from '@mui/material';
import { jobService } from '../../services/job.service';
import { DEVELOPER_LEVELS } from '../../utils/constants';

const validationSchema = Yup.object({
  coverLetter: Yup.string().required('Cover letter is required'),
  developerLevel: Yup.string().required('Developer level is required'),
  yearsOfExperience: Yup.number()
    .min(0, 'Experience cannot be negative')
    .required('Years of experience is required'),
  portfolio: Yup.string().url('Must be a valid URL'),
  resume: Yup.mixed().required('Resume is required'),
});

const ApplicationForm = ({ jobId }) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      coverLetter: '',
      developerLevel: '',
      yearsOfExperience: '',
      portfolio: '',
      resume: null,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setIsSubmitting(true);
        const formData = new FormData();
        Object.keys(values).forEach(key => {
          formData.append(key, values[key]);
        });
        
        await jobService.applyForJob(jobId, formData);
        navigate('/applicant/applications');
      } catch (error) {
        console.error('Application submission failed:', error);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const handleFileChange = (event) => {
    formik.setFieldValue('resume', event.currentTarget.files[0]);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Submit Application
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                name="developerLevel"
                label="Developer Level"
                value={formik.values.developerLevel}
                onChange={formik.handleChange}
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
                rows={6}
                name="coverLetter"
                label="Cover Letter"
                value={formik.values.coverLetter}
                onChange={formik.handleChange}
                error={formik.touched.coverLetter && Boolean(formik.errors.coverLetter)}
                helperText={formik.touched.coverLetter && formik.errors.coverLetter}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                name="yearsOfExperience"
                label="Years of Experience"
                value={formik.values.yearsOfExperience}
                onChange={formik.handleChange}
                error={formik.touched.yearsOfExperience && Boolean(formik.errors.yearsOfExperience)}
                helperText={formik.touched.yearsOfExperience && formik.errors.yearsOfExperience}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="portfolio"
                label="Portfolio URL"
                value={formik.values.portfolio}
                onChange={formik.handleChange}
                error={formik.touched.portfolio && Boolean(formik.errors.portfolio)}
                helperText={formik.touched.portfolio && formik.errors.portfolio}
              />
            </Grid>

            <Grid item xs={12}>
              <input
                accept=".pdf,.doc,.docx"
                style={{ display: 'none' }}
                id="resume-file"
                type="file"
                onChange={handleFileChange}
              />
              <label htmlFor="resume-file">
                <Button variant="outlined" component="span" fullWidth>
                  Upload Resume
                </Button>
              </label>
              {formik.values.resume && (
                <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                  Selected file: {formik.values.resume.name}
                </Typography>
              )}
              {formik.touched.resume && formik.errors.resume && (
                <Typography color="error" variant="caption" display="block">
                  {formik.errors.resume}
                </Typography>
              )}
            </Grid>

            <Grid item xs={12}>
              <Box display="flex" gap={2}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  size="large"
                  disabled={isSubmitting}
                  startIcon={isSubmitting && <CircularProgress size={20} />}
                >
                  Submit Application
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => navigate(-1)}
                  size="large"
                  disabled={isSubmitting}
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

export default ApplicationForm;