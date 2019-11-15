import moment from 'moment';

export const statusMapper = {
  'queued': 'Queued',
  'in_progress': 'In Progress',
  'success': 'Success',
  'failure': 'Failure'
};

export const statusColorMapper = {
  'queued': 'warning',
  'in_progress': 'primary',
  'success': 'success',
  'failure': 'danger'
};

export const formatDateTime = (datetime) => moment(datetime).format("DD/MM/YYYY, h:mm:ss a");

export const checkNullValue = (variable, value) => variable ? value : '';