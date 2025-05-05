export const formatDateToUTC = (date: Date = new Date()): string => {
  return date.toISOString().slice(0, 19).replace("T", " ");
};

export const parseUTCString = (dateString: string): Date => {
  return new Date(dateString.replace(" ", "T") + "Z");
};

export const getCurrentUTCTimestamp = (): string => {
  return formatDateToUTC(new Date());
};
