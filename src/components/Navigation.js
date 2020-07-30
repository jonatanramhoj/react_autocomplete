import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Nav extends Component {
  render () {
    return (
      <div className='nav'>
        <Link to='/page2'>Page2</Link>
        <Link to='/page3'>Page3</Link>
        <Link to='/page4'>Page4</Link>
      </div>
    );
  }
}

export default Nav;
