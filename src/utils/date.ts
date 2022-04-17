import dayjs from 'dayjs';

const formatDate = (d: Date): string => {
  return dayjs(d).format('YYYY-MM-DD HH:mm');
};

export { formatDate };
