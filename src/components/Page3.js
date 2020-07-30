import React, { Component } from 'react';
import Nav from './Navigation';

class Page3 extends Component {
  render () {
    return (
      <div>
        <Nav />
        <div className='main'>
          <h1>Hello from page 3</h1>
        </div>
      </div>
    );
  }
}

export default Page3;
