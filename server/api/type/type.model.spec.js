'use strict';

import { Type } from '../../config/db.conf.js';
import { expect } from 'chai';

const genType = () => {
    type = Type.build({
        name: 'Kia Sportage'
    });
    return type;
};

let type;

describe('Type Model', () => {

    before(() =>{
        return Type.sync()
            .then(() => {
                return Type.destroy({ where: {} });
            });
    });

    beforeEach(() => {
        genType();
    });

    afterEach(() => {
        return Type.destroy({ where: {} });
    });

    it('should fail when saving a duplicate type', () => {
        return expect(type.save()
            .then(() => {
                const typeDup = genType();
                return typeDup.save();
            })).to.be.rejected;
    });

});
