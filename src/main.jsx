import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {
  RouterProvider,
} from "react-router-dom";
import router from './Components/Routes/Route.jsx';
import AuthProvider from './Components/Providers/AuthProvider.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <React.StrictMode>
          <div className=' max-w-screen-xl mx-auto bg-fuchsia-50'>
            <RouterProvider router={router} />
          </div>
        </React.StrictMode>
      </HelmetProvider>
    </QueryClientProvider>

  </AuthProvider>,
)
