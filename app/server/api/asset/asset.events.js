/**
 * Asset model events
 */

'use strict';

import { EventEmitter } from 'events';
import { Asset } from '../../sqldb';

const AssetEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
AssetEvents.setMaxListeners(0);

// Model events
const events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (const e in events) {
  const event = events[e];
  Asset.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return (doc, options, done) => {
    AssetEvents.emit(event + ':' + doc._id, doc);
    AssetEvents.emit(event, doc);
    done(null);
  }
}

export default AssetEvents;
