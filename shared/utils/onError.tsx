import { toast } from "sonner";

type ErrorResponse = {
  response?: {
    data?: {
      title?: string;
      status?: number;
      errorCodes?: string[];
      errors?: Record<string, string[]>;
    };
  };
};

// type Handlers = {
//   onSuccess?: () => void;
//   onError?: (error: ErrorResponse) => void;
// };

export const handleMutationResponse = (params: { error: ErrorResponse; successCallback?: () => void; errorCallback?: (message: string) => void }) => {
  const { error, successCallback, errorCallback } = params;

  console.warn(successCallback);

  if (error?.response?.data) {
    const errorTitle = error.response.data.title ?? "Unexpected error occurred";
    toast.error(errorTitle); // ⛔️ Using sonner to show toast
    if (errorCallback) errorCallback(errorTitle);
  }
};

export const handleSuccess = (callback: () => void) => {
  callback(); // Success only opens modal or updates state
};
