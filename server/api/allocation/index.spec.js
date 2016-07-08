'use strict';

import sinon from 'sinon';
import { expect } from 'chai';

const routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

describe('Index API Router:', () => {

  describe('GET /api/allocations', () => {

    it('should verify route to allocation.controller.index', () => {
      expect(routerStub.get
        .withArgs('/', 'indexCtrl.index')
      ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/allocations', () => {

    it('should route to allocation.controller.create', () => {
    expect(routerStub.post
      .withArgs('/', 'indexCtrl.create')
    ).to.have.been.calledOnce;
  });

  });

  describe('DELETE /api/allocations/:id', () => {

    it('should verify route to allocation.controller.destroy', () => {
      expect(routerStub.delete
        .withArgs('/:id', 'indexCtrl.destroy')
      ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/allocations/:id', () => {

    it('should verify route to allocation.controller.update', () => {
      expect(routerStub.put
        .withArgs('/:id', 'indexCtrl.update')
      ).to.have.been.calledOnce;
    });

  });

});
