'use strict';

import { Asset, Type } from '../../config/db.conf.js';
import { expect } from 'chai';

const genAsset = () => {
  asset = Asset.build({
    name: 'Kia Sportage',
    assetTypeId: 1,
    parameters: {
      width: 200,
      height: 120,
      length: 350
    }
  });
  return asset;
};

let asset;

describe('Asset Model', () => {

    before(() =>{
        return Asset.sync()
            .then(() => {
                return Asset.destroy({ where: {} });
            });
    });

    beforeEach(() => {
        genAsset();
    });

    afterEach(() => {
        return Asset.destroy({ where: {} });
    });

    it('should fail when saving a duplicate asset', () => {
        return expect(asset.save()
            .then(() => {
                const assetDup = genAsset();
                return assetDup.save();
            })).to.be.rejected;
    });

    it('should fail when saving asset with unknown asset type', () => {
        asset.assetTypeId = 666;
        return expect(asset.save()).to.be.rejected;
    });

    it('should save asset with unknown parameters', () => {
        asset.parameters['model'] = 'Kia';
        return expect(asset.save()).to.not.be.rejected;
    });

});
