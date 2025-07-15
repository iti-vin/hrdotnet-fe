export type ValidationErrorResponse = {
  type: string;
  title: string;
  status: number;
  errors: Record<string, string[]>; // Dynamic keys with an array of error messages
  traceId: string;
};
