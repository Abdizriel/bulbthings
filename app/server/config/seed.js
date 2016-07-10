/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import { Type, User, Asset, Allocation } from '../sqldb';

userSync()
  .then(() => assetSyncRemove())
  .then(() => typeSync())
  .then(() => assetSyncCreate())
  .then(() => allocationSync());

function userSync () {
  return User.sync()
    .then(() => {
      return User.destroy({ where: {} });
    })
    .then(() => {
      return User.bulkCreate([{
        _id: 1,
        firstName: 'Marcin',
        lastName: 'Mrotek',
        email: 'kontakt@marcinmrotek.pl'
      }, {
        _id: 2,
        firstName: 'Emilia',
        lastName: 'Heller',
        email: 'emkacf@gmail.com'
      }]);
    })
    .then(() => {
      console.log('Users was created');
    });
}

function typeSync () {
  return Type.sync()
    .then(() => {
      return Type.destroy({ where: {} });
    })
    .then(() => {
      Type.bulkCreate([{
        _id: 1,
        name: 'car',
        attrs: ['brand', 'model', 'productionYear']
      }, {
        _id: 2,
        name: 'phone',
        attrs: ['brand', 'model', 'productionYear']
      }, {
        _id: 3,
        name: 'animal',
        attrs: ['race', 'age']
      }]);
    })
    .then(() => {
      console.log('Asset Types was created');
    });
}

function assetSyncCreate () {
  return Asset.sync()
    .then(() => {
      Asset.bulkCreate([{
        _id: 1,
        TypeId: 1,
        name: 'Kia Sportage',
        parameters: {
          brand: 'Kia',
          model: 'Sportage',
          productionYear: 2016
        }
      }, {
        _id: 2,
        TypeId: 1,
        name: 'Hyundai ix35',
        parameters: {
          brand: 'Hyundai',
          model: 'ix35',
          productionYear: 2016
        }
      }, {
        _id: 3,
        TypeId: 2,
        name: 'Lumia 820',
        parameters: {
          brand: 'Microsoft',
          model: 'Lumia 820',
          productionYear: 2015
        }
      }, {
        _id: 4,
        TypeId: 2,
        name: 'iPhone 6s',
        parameters: {
          brand: 'Apple',
          model: 'iPhone 6s',
          productionYear: 2015
        }
      }, {
        _id: 5,
        TypeId: 3,
        name: 'Pestka',
        parameters: {
          race: 'Australian Shepard',
          age: 1,
          owner: 'Emilia Heller'
        }
      }]);
    })
    .then(() => {
      console.log('Asset was created');
    });

}

function assetSyncRemove () {
  return Asset.sync()
    .then(() => {
      return Asset.destroy({ where: {} });
    })
    .then(() => {
      console.log('Assets was removed');
    });

}

function allocationSync () {
  return Allocation.sync()
    .then(() => {
      return Allocation.destroy({ where: {} });
    })
    .then(() => {
      console.log('Allocations was removed');
    });
}
