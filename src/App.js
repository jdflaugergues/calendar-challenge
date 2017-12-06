import React, { Component } from 'react';
import {Calendar} from './components/index';

import cxs from 'cxs';

class App extends Component {

  render() {

    const appStyle = cxs({
      textAlign: 'center'
    });

    return (
      <div className={appStyle}>
        <Calendar {...this.props}/>
      </div>
    );
  }
}

export default App;
