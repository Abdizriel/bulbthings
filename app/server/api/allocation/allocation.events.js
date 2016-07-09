/**
 * Allocation model events
 */

'use strict';

import { EventEmitter } from 'events';
import { Allocation } from '../../sqldb';

const AllocationEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
AllocationEvents.setMaxListeners(0);

// Model events
const events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (const e in events) {
  const event = events[e];
  Allocation.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return (doc, options, done) => {
    AllocationEvents.emit(event + ':' + doc._id, doc);
    AllocationEvents.emit(event, doc);
    done(null);
  }
}

export default AllocationEvents;
