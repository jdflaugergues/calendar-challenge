import React, {Component} from 'react';
import PropTypes from 'prop-types'

import cxs from 'cxs';


const style = {
  global: {
    textAlign: 'right',
    marginRight: '10px'
  },
  hour: {
    color: 'black',
    fontSize: '14px'
  },
  ampm: {
    color: '#a5a5a5'
  },
  half: {
    color: '#a5a5a5',
    fontSize: '10px'
  }
};

class Hour extends Component {

  render() {

    const height = this.props.height;

    const hourStyle = cxs(Object.assign, style.hour, {
      height: `${height / 2}px`
    });

    const halfStyle = cxs(Object.assign, style.half, {
      height: `${height / 2}px`,
      display: this.props.isLast ? 'none' : 'block'
    });

    return (
      <div className={cxs(style.global)}>
        <div className={hourStyle}>{this.props.hour.hour}:00 <span className={cxs(style.half)}>{this.props.hour.ampm}</span></div>
        <div className={halfStyle}>{this.props.hour.hour}:30</div>
      </div>
    );
  }
}

export default Hour;

Event.propTypes = {
  hour: PropTypes.shape({
    hour: PropTypes.number.isRequired,
    ampm: PropTypes.string.isRequired,
  }),
  height: PropTypes.number.isRequired,
  isLast: PropTypes.bool
};
