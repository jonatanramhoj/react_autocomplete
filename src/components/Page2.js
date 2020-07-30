import React, { Component } from 'react';
import Nav from './Navigation';

class Page2 extends Component {
  render () {
    return (
      <div>
        <Nav />
        <div className='main'>
          <h1>Hello from page 2</h1>
        </div>
      </div>
    );
  }
}

export default Page2;
