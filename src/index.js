import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import './css/reset.css';
import './css/app.css';
import AutoComplete from './components/AutoComplete';
import Page2 from './components/Page2';
import Page3 from './components/Page3';
import Page4 from './components/Page4';

render((
  <BrowserRouter>
    <Route exact path='/' component={AutoComplete} />
    <Route path='/page2' component={Page2} />
    <Route path='/page3' component={Page3} />
    <Route path='/page4' component={Page4} />
  </BrowserRouter>
), document.getElementById('root'));
