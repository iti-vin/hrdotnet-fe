export const calculateDuration = (dateRange: [Date | null, Date | null]): number => {
  const [startDate, endDate] = dateRange;
  if (!startDate || !endDate) return 0;
  const duration = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
  return duration + 1;
};
