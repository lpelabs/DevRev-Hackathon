import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from './components/Dashboard';
import UserDashboard from './components/UserDashboard';
import { QueryClient, QueryClientProvider } from 'react-query';
// Define routes
const routes = [
  { path: "/client-dashboard", element: <UserDashboard /> },
];

// Create a router with defined routes
const router = createBrowserRouter(routes);

// Create a new QueryClient instance
const queryClient = new QueryClient();

// Use React.createRoot directly
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app with StrictMode, QueryClientProvider, and RouterProvider
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);