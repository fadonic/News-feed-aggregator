import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 5, // 5 minutes — news doesn't need to refetch aggressively
			retry: 1,
			refetchOnWindowFocus: false,
		},
	},
});
