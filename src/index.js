import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'jalali-moment';

import './index.css';
import App from './App';

moment.locale('fa', { useGregorianParser: true });
ReactDOM.render(<App />, document.getElementById('root'));
