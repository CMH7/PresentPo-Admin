import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Pages from './pages'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { ToastContainer } from 'react-toastify';

const client = new ApolloClient({
  uri: 'https://presentpo-backend.herokuapp.com/graphql',
  // uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <div className="absolute">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"

          />
      </div>
      <Pages />
    </ApolloProvider>
  </React.StrictMode>,
)