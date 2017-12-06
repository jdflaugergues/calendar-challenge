import React, { Component } from 'react';
import cxs from 'cxs';
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes';

const padding = 7;
const borderSize = 1;
const leftBorderSize = 4;

const style = {
  event: {
    top: '50px',
    left: '10px',
    width: '595px',
    height: '48px',
    background: '#ffffff',
    position: 'absolute',
    border: `${borderSize}px solid #d5d5d5`,
    borderLeft: `${leftBorderSize}px solid #4b6ea8`,
    textAlign: 'left'
  },
  title: {
    color: '#4b6ea8',
    fontSize: '14px',
    fontWeight: 'bold',
    padding: `${padding}px`
  },
  content: {
    color: '#979797',
    fontSize: '10px',
    padding: `${padding}px`
  }
};

export default class Event extends Component {

    render() {

      const {nbMaxColumn, event} = this.props;

      const eventStyle = cxs(Object.assign(style.event, {
        top: `${event.get('start')}px`,
        height: `${event.get('end') - event.get('start')}px`,
        width: `${((595 / nbMaxColumn) - leftBorderSize - borderSize) * event.get('width') + ((event.get('width') - 1) * (leftBorderSize + borderSize ) )}px`,
        left: `${10 + (595 / nbMaxColumn) * event.get('numColumn')}px`
      }));

      return (
        <div className={eventStyle}>
          <span className={cxs(style.title)}>Sample Item</span>
          <br/>
          <span className={cxs(style.content)}>Sample Location : {this.props.event.get('end')}</span>
        </div>
      );
    }
}

Event.propTypes = {
  event: ImmutablePropTypes.mapContains({
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
    numColumn: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired
  }),
  nbMaxColumn: PropTypes.number.isRequired
};

// export default Event;
