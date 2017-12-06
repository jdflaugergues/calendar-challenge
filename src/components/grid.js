import React, { Component } from 'react';

import {List, Map} from 'immutable';
import _ from 'lodash';

import cxs from 'cxs';

import {Event} from './index';
import {EVENTS, EVENTS_A} from '../__mooks__/dataMock';

const EMPTY_LIST = List();

const style = {
  grid: {
    width: '599px',
    height: '760px',
    background: '#ececec',
    paddingRight: '10px',
    paddingLeft: '10px',
    position: 'relative',
    float: 'left',
    top: '7px',
    borderLeft: '1px solid #d5d5d5'
  }
};

// check if an event overlap an other one
function isOverlap(event1, event2) {
  return ((event2.start < event1.end && event2.start >= event1.start) || (event1.start < event2.end && event1.start >= event2.start));
}

// find among all events, the first overlapping an event
function findOverlappingEvent(events, event) {
  return _.find(events, currentEvent => isOverlap(currentEvent, event));
}

// Put an event in its right column
function pushEventColumn(event, numColumn, eventColumns) {
  const overlappingEvent = findOverlappingEvent(eventColumns[numColumn], event);

  if (!eventColumns[numColumn]) {
    eventColumns[numColumn] = [];
  }
  if (!overlappingEvent) {
    event = Object.assign(event, {numColumn});
    return eventColumns[numColumn].push(event);
  }
  pushEventColumn(event, ++numColumn, eventColumns);
}

// Get the number of event which are overlap another one
function getNumberOfOverlapping(events, event) {
  return events.reduce((nbOverlapping, currentEvent) => {
    return nbOverlapping + Number(isOverlap(currentEvent, event));
  }, 0);
}

// Set on all events its width
function setEventsWidth(eventsColumns) {

  eventsColumns.forEach((eventsColumn, i) => {
    eventsColumn.forEach(event => {
      let width = 1;
      for (let j = i+1 ; j < eventsColumns.length ; j++) {
        if (!getNumberOfOverlapping(eventsColumns[j], event)) {
          width++;
        } else {
          break;
        }
      }
      Object.assign(event, {width});
    })
  });

}

class Grid extends Component {

  constructor(props) {
    super(props);

    this.state = {
      events: EMPTY_LIST,
      eventColumns: 0
    };

    this.setEvents = this.setEvents.bind(this);
    window.layOutDay = this.handleEventsChange.bind(this);
  }

  componentWillMount() {
    this.setEvents(EVENTS);
  }

  handleEventsChange(events) {
    this.setEvents(events);
  }

  setEvents(events) {
    const eventsColumns = [];

    events.forEach(event => pushEventColumn(event, 0, eventsColumns));
    setEventsWidth(eventsColumns);

    this.setState({events: EMPTY_LIST});
    this.setState({
      events: List(_.flatten(eventsColumns).map(event => Map(event))) || EMPTY_LIST,
      eventColumns: eventsColumns
    });
  }

  render() {
    const gridStyle = cxs(Object.assign(style.grid, {
      height: `${this.props.height}px`
    }));

    return (
      <div className={gridStyle}>
        {this.state.events.map((event, i) =>
          <Event
            key={i}
            event={event}
            nbMaxColumn={this.state.eventColumns.length}
          />
        )}
      </div>
    );
  }
}

export default Grid;
