import { ApolloProvider } from '@apollo/client';
import { Provider } from 'react-redux';
import generateStore from './Redux/store';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/tailwind.css';
import client from './Config/apollo';

const store = generateStore();

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <Provider store={store}>
                <App />
            </Provider>
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
export default client;
