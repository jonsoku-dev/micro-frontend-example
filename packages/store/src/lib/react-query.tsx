import { QueryClient } from "@tanstack/react-query";

export const storeQueryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // Keep cached data for 5 minutes
            staleTime: 1000 * 60 * 5,
            // Cache data for 10 minutes
            gcTime: 1000 * 60 * 10,
            // Prevent refetching on window focus
            refetchOnWindowFocus: false,
            // Prevent duplicate requests while a query is pending
            retry: false,
        }
    }
});