'use strict';

import { Allocation } from '../../config/db.conf.js';
import { expect } from 'chai';

const genAllocation = () => {
    allocation = Allocation.build({
        name: '21.5-inch iMac with Retina 4K display'
    });
    return allocation;
};

let allocation;

describe('Allocation Model', () => {

    before(() =>{
        return Allocation.sync()
            .then(() => {
                return Allocation.destroy({ where: {} });
            });
    });

    beforeEach(() => {
        genAllocation();
    });

    afterEach(() => {
        return Allocation.destroy({ where: {} });
    });

    it('should fail when saving a duplicate allocation', () => {
        return expect(allocation.save()
            .then(() => {
                const allocationDup = genAllocation();
                return allocationDup.save();
            })).to.be.rejected;
    });

});
