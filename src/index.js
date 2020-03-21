import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Codechef from './Codechef';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Codechef />, document.getElementById('root'));

serviceWorker.unregister();
