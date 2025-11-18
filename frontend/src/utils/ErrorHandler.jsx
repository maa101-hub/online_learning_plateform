// utils/errorHandler.js
import { toast } from 'react-toastify';

export const handleApiError = (error, defaultMessage = 'Something went wrong') => {
  const errMsg =
    error?.response?.data?.error || error?.message || defaultMessage;
    
  toast.error(errMsg);
  console.error(errMsg);
};
