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

  describe('GET /api/asset-types', () => {

    it('should verify route to asset-type.controller.index', () => {
      expect(routerStub.get
        .withArgs('/', 'indexCtrl.index')
      ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/asset-types', () => {

    it('should route to asset-type.controller.create', () => {
      expect(routerStub.post
        .withArgs('/', 'indexCtrl.create')
      ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/asset-types/:id', () => {

    it('should verify route to asset-type.controller.destroy', () => {
      expect(routerStub.delete
        .withArgs('/:id', 'indexCtrl.destroy')
      ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/asset-types/:id', () => {

    it('should verify route to asset-type.controller.update', () => {
      expect(routerStub.put
        .withArgs('/:id', 'indexCtrl.update')
      ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/asset-types/:id', () => {

    it('should verify route to asset-type.controller.show', () => {
      expect(routerStub.get
        .withArgs('/:id', 'indexCtrl.show')
      ).to.have.been.calledOnce;
    });

  });

});
