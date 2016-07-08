'use strict';

import { AssetType } from '../../config/db.conf';
import { expect } from 'chai';

const genAsset = () => {
    assetType = AssetType.build({
        name: '21.5-inch iMac with Retina 4K display'
    });
    return assetType;
};

let assetType;

describe('Asset Model', () => {

    before(() =>{
        return AssetType.sync()
            .then(() => {
                return AssetType.destroy({ where: {} });
            });
    });

    beforeEach(() => {
        genAsset();
    });

    afterEach(() => {
        return AssetType.destroy({ where: {} });
    });

    it('should fail when saving a duplicate asset', () => {
        return expect(assetType.save()
            .then(() => {
                const assetTypeDup = genAsset();
                return assetTypeDup.save();
            })).to.be.rejected;
    });

});
