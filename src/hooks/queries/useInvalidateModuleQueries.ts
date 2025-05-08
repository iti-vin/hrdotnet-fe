import { QueryClient } from "@tanstack/react-query";

export const invalidateMultipleModules = (queryClient: QueryClient, modules: readonly (readonly string[])[][]) => {
  modules.flat().forEach((queryKey) => {
    queryClient.invalidateQueries({ queryKey });
  });
};
