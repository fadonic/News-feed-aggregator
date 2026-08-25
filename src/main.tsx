import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import App from './App.tsx';
import { queryClient } from './config/queryClient';
import { PreferencesProvider } from './context/PreferencesContext';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<PreferencesProvider>
				<App />
			</PreferencesProvider>
		</QueryClientProvider>
	</StrictMode>,
);
