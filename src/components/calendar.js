import React, { Component } from 'react';

import cxs from 'cxs';

import {Grid, Hours} from './index';

const calendar = cxs({
  padding: '10px',
  paddingTop: '30px'
});

const height = 720;

class Calendar extends Component {
  render() {
    return (
      <div className={calendar}>
        <Hours height={height}/>
        <Grid height={height}/>
      </div>
    );
  }
}

export default Calendar;
