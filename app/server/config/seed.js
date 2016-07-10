/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import { Type, User, Asset, Allocation } from '../sqldb';
let type, user, asset, allocation;

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
        firstName: 'Marcin',
        lastName: 'Mrotek',
        email: 'kontakt@marcinmrotek.pl'
      }, {
        firstName: 'Emilia',
        lastName: 'Heller',
        email: 'emkacf@gmail.com'
      }], {returning: true});
    })
    .then(users => {
      user = users;
      console.log('Users was created');
    });
}

function typeSync () {
  return Type.sync()
    .then(() => {
      return Type.destroy({ where: {} });
    })
    .then(() => {
      return Type.bulkCreate([{
        name: 'Car',
        attrs: ['brand', 'model', 'productionYear']
      }, {
        name: 'Phone',
        attrs: ['brand', 'model', 'productionYear']
      }, {
        name: 'Animal',
        attrs: ['race', 'age']
      }], {returning: true});
    })
    .then(types => {
      type = types;
      console.log('Asset Types was created');
    });
}

function assetSyncCreate () {
  return Asset.sync()
    .then(() => {
      return Asset.bulkCreate([{
        TypeId: type[0]._id,
        name: 'Kia Sportage',
        parameters: {
          brand: 'Kia',
          model: 'Sportage',
          productionYear: 2016
        }
      }, {
        TypeId: type[0]._id,
        name: 'Hyundai ix35',
        parameters: {
          brand: 'Hyundai',
          model: 'ix35',
          productionYear: 2016
        }
      }, {
        TypeId: type[1]._id,
        name: 'Lumia 820',
        parameters: {
          brand: 'Microsoft',
          model: 'Lumia 820',
          productionYear: 2015
        }
      }, {
        TypeId: type[1]._id,
        name: 'iPhone 6s',
        parameters: {
          brand: 'Apple',
          model: 'iPhone 6s',
          productionYear: 2015
        }
      }, {
        TypeId: type[2]._id,
        name: 'Pestka',
        parameters: {
          race: 'Australian Shepard',
          age: 1,
          owner: 'Emilia Heller'
        }
      }], {returning: true});
    })
    .then(assets => {
      asset = assets;
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
