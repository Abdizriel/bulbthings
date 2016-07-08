'use strict';

import { AssetAttribute } from '../../config/db.conf.js';
import { expect } from 'chai';

const genAsset = () => {
    assetAttribute = AssetAttribute.build({
        key: 'Length',
        value: '100cm'
    });
    return assetAttribute;
};

let assetAttribute;

describe('Asset Attribute Model', () => {

    before(() =>{
        return AssetAttribute.sync()
            .then(() => {
                return AssetAttribute.destroy({ where: {} });
            });
    });

    beforeEach(() => {
        genAsset();
    });

    afterEach(() => {
        return AssetAttribute.destroy({ where: {} });
    });

    it('should fail when saving a duplicate asset', () => {
        return expect(assetAttribute.save()
            .then(() => {
                const assetAttributeDup = genAsset();
                return assetAttributeDup.save();
            })).to.be.rejected;
    });

});
