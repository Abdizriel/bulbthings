'use strict';

import { Type } from '../../sqldb';
import { expect } from 'chai';

const genType = () => {
    type = Type.build({
        name: 'Kia Sportage',
        attrs: ['brand']
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

    describe('#name', () => {

      it('should fail when saving without name', () => {
        delete type.name;
        return expect(type.save()).to.be.rejected;
      });

      it('should fail when saving without unique name', () => {
        return expect(type.save()
          .then(() => {
            let typeDup = genType();
            typeDup.name = type.name;
            return typeDup.save();
          })).to.be.rejected;
      });

      it('should pass when saving with unique name', () => {
        return expect(type.save()
          .then(() => {
            let typeDup = genType();
            typeDup.name = 'Unique name';
            return typeDup.save();
          })).to.not.be.rejected;
      });

    });

    describe('#attrs', () => {

      it('should fail when saving without attrs', () => {
        delete type.attrs;
        return expect(type.save()).to.be.rejected;
      });

      it('should fail when saving with attrs type different than Array', () => {
        type.attrs = 'SomeString';
        return expect(type.save()).to.be.rejected;
      });

      it('should fail when saving with attrs empty Array', () => {
        type.attrs = [];
        return expect(type.save()).to.be.rejected;
      });

      it('should pass when saving with attrs array with at least one parameter', () => {
        type.attrs = ['brand'];
        return expect(type.save()).to.not.be.rejected;
      });

    });

});
