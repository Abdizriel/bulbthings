'use strict';

import { Asset } from '../../sqldb';
import { expect } from 'chai';

const genAsset = () => {
  asset = Asset.build({
    name: 'Kia Sportage',
    TypeId: 1,
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

    describe('#name', () => {

      it('should fail when saving asset without name', () => {
        delete asset.name;
        return expect(asset.save()).to.be.rejected;
      });

      it('should fail when saving asset without unique name', () => {
        return expect(asset.save()
          .then(() => {
            let assetDup = genAsset();
            assetDup.name = asset.name;
            return assetDup.save();
          })).to.be.rejected;
      });

      it('should pass when saving asset with unique name', () => {
        return expect(asset.save()
          .then(() => {
            let assetDup = genAsset();
            assetDup.name = 'Unique name';
            return assetDup.save();
          })).to.not.be.rejected;
      });

    });

    describe('#parameters', () => {

      it('should fail when saving asset without parameters', () => {
        delete asset.parameters;
        return expect(asset.save()).to.be.rejected;
      });

      it('should fail when saving asset with parameters not object type', () => {
        asset.parameters = 'String';
        return expect(asset.save()).to.be.rejected;
      });

      it('should pass when saving asset with parameters object type', () => {
        asset.parameters = {};
        return expect(asset.save()).to.not.be.rejected;
      });

    });

    describe('#TypeId', () => {

      it('should fail when saving asset without TypeId', () => {
        delete asset.TypeId;
        return expect(asset.save()).to.not.be.rejected;
      });

      it('should fail when saving asset with unknown TypeId', () => {
        asset.TypeId = 666;
        return expect(asset.save()).to.be.rejected;
      });

      it('should fail when saving asset with known TypeId', () => {
        asset.TypeId = 1;
        return expect(asset.save()).to.not.be.rejected;
      });

    });

});
