/**
 * Type model events
 */

'use strict';

import { EventEmitter } from 'events';
import { Type } from '../../sqldb';

const TypeEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
TypeEvents.setMaxListeners(0);

// Model events
const events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (const e in events) {
  const event = events[e];
  Type.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return (doc, options, done) => {
    TypeEvents.emit(event + ':' + doc._id, doc);
    TypeEvents.emit(event, doc);
    done(null);
  }
}

export default TypeEvents;
