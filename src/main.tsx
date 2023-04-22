import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Pages from './pages'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
// @ts-ignore
import store from './store'
import { Provider } from 'react-redux'

const client = new ApolloClient({
  uri: 'https://presentpo-backend.herokuapp.com/graphql',
  // uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <Pages />
      </ApolloProvider>
    </Provider>
  </React.StrictMode>,
)