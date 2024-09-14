import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnmount: false,
      refetchOnReconnect: false,
      retry: false,
      // staleTime: 5 * 60 * 1000,
    },
  },
});
createRoot(document.getElementById('root')).render(
  <StrictMode>
          <QueryClientProvider client={queryClient}>

    <BrowserRouter>

    <App />
    </BrowserRouter>
    </QueryClientProvider>


  </StrictMode>,
)
