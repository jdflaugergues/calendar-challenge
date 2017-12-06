import React, {Component} from 'react';
import _ from 'lodash';

import cxs from 'cxs';

import {Hour} from './index';

const NB_HOURS = 12;
const START_TIME = 9;

const style = {
  hours: {
    position: 'relative',
    width: '80px',
    float: 'left'
  }
};

class Hours extends Component {

  render() {

    const height = this.props.height;

    const hoursStyle = cxs(Object.assign, style.hours, {
      height: `${height}px`
    });

    const hourHeight = height / NB_HOURS;

    const hours = _.times(NB_HOURS + 1, (index) => ({
      hour: (START_TIME + index) % 12 || 12,
      ampm : Math.floor((START_TIME + index) / 12) && 'PM' || 'AM'
    }));

    return (
      <div className={hoursStyle}>
        {hours.map((hour, i) =>
          <Hour
            key={i}
            hour={hour}
            height={hourHeight}
            isLast={i === hours.length - 1}
          />
        )}
      </div>
    );
  }
}

export default Hours;
