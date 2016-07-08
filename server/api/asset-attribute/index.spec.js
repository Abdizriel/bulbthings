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

  describe('GET /api/asset-attributes', () => {

    it('should verify route to asset-attribute.controller.index', () => {
      expect(routerStub.get
        .withArgs('/', 'indexCtrl.index')
      ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/asset-attributes', () => {

    it('should route to asset-attribute.controller.create', () => {
    expect(routerStub.post
      .withArgs('/', 'indexCtrl.create')
    ).to.have.been.calledOnce;
  });

  });

  describe('DELETE /api/asset-attributes/:id', () => {

    it('should verify route to asset-attribute.controller.destroy', () => {
      expect(routerStub.delete
        .withArgs('/:id', 'indexCtrl.destroy')
      ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/asset-attributes/:id', () => {

    it('should verify route to asset-attribute.controller.update', () => {
      expect(routerStub.put
        .withArgs('/:id', 'indexCtrl.update')
      ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/asset-attributes/:id', () => {

    it('should verify route to asset-attribute.controller.show', () => {
      expect(routerStub.get
        .withArgs('/:id', 'indexCtrl.show')
      ).to.have.been.calledOnce;
    });

  });

});
