'use strict';

import { Asset } from '../../config/db.conf.js';
import { expect } from 'chai';

const genAsset = () => {
    asset = Asset.build({
        name: '21.5-inch iMac with Retina 4K display'
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

});
