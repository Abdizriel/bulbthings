'use strict';

import { Allocation } from '../../sqldb';
import { expect } from 'chai';

const genAllocation = () => {
  allocation = Allocation.build({
    UserId: 1,
    AssetId: 1,
    allocatedFrom: new Date('2016-06-08').toISOString(),
    allocatedTo: new Date('2016-07-08').toISOString()
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

  describe('#UserId', () => {

    it('should fail when saving without UserId', () => {
      allocation.UserId = '';
      return expect(allocation.save()).to.be.rejected;
    });

    it('should fail when saving with wrong UserId', () => {
      allocation.UserId = 'wrongUserId';
      return expect(allocation.save()).to.be.rejected;
    });

    it('should fail when saving with correct UserId', () => {
      allocation.UserId = 1;
      return expect(allocation.save()).to.not.be.rejected;
    });

  });

  describe('#AssetId', () => {

    it('should fail when saving without AssetId', () => {
      allocation.AssetId = '';
      return expect(allocation.save()).to.be.rejected;
    });

    it('should fail when saving with wrong AssetId', () => {
      allocation.AssetId = 'wrongAssetId';
      return expect(allocation.save()).to.be.rejected;
    });

    it('should fail when saving with correct AssetId', () => {
      allocation.AssetId = 1;
      return expect(allocation.save()).to.not.be.rejected;
    });

  });

  describe('#allocatedFrom', () => {

    it('should fail when saving without allocatedFrom', () => {
      allocation.allocatedFrom = '';
      return expect(allocation.save()).to.be.rejected;
    });

    it('should fail when saving with wrong date', () => {
      allocation.allocatedFrom = "2016-10-45T10:40:37.000Z";
      return expect(allocation.save()).to.be.rejected;
    });

    it('should fail when saving with allocatedFrom after allocatedTo', () => {
      allocation.allocatedFrom = "2016-10-08T10:40:37.000Z";
      allocation.allocatedTo = "2016-09-08T10:40:37.000Z";
      return expect(allocation.save()).to.be.rejected;
    });

    it('should pass when saving with correct allocatedTo', () => {
      allocation.allocatedTo = 1;
      allocation.allocatedFrom = "2016-08-08T10:40:37.000Z";
      allocation.allocatedTo = "2016-09-08T10:40:37.000Z";
      return expect(allocation.save()).to.not.be.rejected;
    });

  });

  describe('#allocatedTo', () => {

    it('should fail when saving without allocatedTo', () => {
      allocation.allocatedTo = '';
      return expect(allocation.save()).to.be.rejected;
    });

    it('should fail when saving with wrong date', () => {
      allocation.allocatedTo = "2016-10-45T10:40:37.000Z";
      return expect(allocation.save()).to.be.rejected;
    });

    it('should fail when saving with allocatedTo before allocatedFrom', () => {
      allocation.allocatedTo = "2016-09-08T10:40:37.000Z";
      allocation.allocatedFrom = "2016-09-10T10:40:37.000Z";
      return expect(allocation.save()).to.be.rejected;
    });

    it('should pass when saving with correct allocatedTo', () => {
      allocation.allocatedTo = 1;
      allocation.allocatedFrom = "2016-08-08T10:40:37.000Z";
      allocation.allocatedTo = "2016-09-08T10:40:37.000Z";
      return expect(allocation.save()).to.not.be.rejected;
    });

  });

});
