import api from './api';

export const jobService = {
  getJobs: async (filters) => {
    const response = await api.get('/jobs', { params: filters });
    return response.data;
  },

  getJobById: async (id) => {
    const response = await api.get(`/jobs/${id}`);
    return response.data;
  },

  getUserApplications: async (userId) => {
    const response = await api.get(`/applications/user/${userId}`);
    return response.data;
  },

  applyForJob: async (jobId, applicationData) => {
    const response = await api.post(`/applications/job/${jobId}`, applicationData);
    return response.data;
  },

  updateApplication: async (applicationId, status) => {
    const response = await api.put(`/applications/${applicationId}`, { status });
    return response.data;
  },
};