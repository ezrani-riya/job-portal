export const DEVELOPER_LEVELS = {
    BEGINNER: 'Beginner',
    EARLY_BEGINNER: 'Early Beginner',
    JUNIOR_DEVELOPER: 'Junior Developer',
    MID_LEVEL_DEVELOPER: 'Mid-Level Developer',
    SENIOR_DEVELOPER: 'Senior Developer',
    TECH_LEAD: 'Tech Lead',
    EXPERT_DEVELOPER: 'Expert Developer',
    MASTER_DEVELOPER: 'Master Developer',
  };
  
  export const APPLICATION_STATUS = {
    PENDING: 'pending',
    UNDER_REVIEW: 'under-review',
    SHORTLISTED: 'shortlisted',
    ACCEPTED: 'accepted',
    REJECTED: 'rejected',
  };
  
  export const EMPLOYMENT_TYPES = {
    FULL_TIME: 'Full Time',
    PART_TIME: 'Part Time',
    CONTRACT: 'Contract',
    INTERNSHIP: 'Internship',
  };
  
  export const API_ENDPOINTS = {
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      VALIDATE: '/auth/validate',
    },
    JOBS: {
      LIST: '/jobs',
      DETAILS: (id) => `/jobs/${id}`,
      APPLY: (id) => `/jobs/${id}/apply`,
    },
    APPLICATIONS: {
      USER: (userId) => `/applications/user/${userId}`,
      UPDATE: (id) => `/applications/${id}`,
    },
  };