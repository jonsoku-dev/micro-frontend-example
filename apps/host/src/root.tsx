import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { init } from '@module-federation/runtime';
import App from './app/app';
import './styles.css';
import Layout from './layout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ProfileProvider } from '@custom-mfe/store';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import User from './app/user';

init({
    name: 'host',
    remotes: []
});

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <StrictMode>
        <ProfileProvider>
            <QueryClientProvider client={queryClient}>
                <Router>
                    <Layout>
                        <Routes>
                            <Route path="/*" element={<App />} />
                            <Route path="/user" element={<User />} />
                        </Routes>
                    </Layout>
                </Router>
            </QueryClientProvider>
        </ProfileProvider>
    </StrictMode>
);
