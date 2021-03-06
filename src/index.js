import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { FirebaseContext } from './Firebase';
import Firebase from "./Firebase"

import * as serviceWorker from './serviceWorker';
import { InfoProvider } from './Contexts/InfoContext';

ReactDOM.render(
    <FirebaseContext.Provider value={new Firebase()}>
        <InfoProvider>
            <App />
        </InfoProvider>
    </FirebaseContext.Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
