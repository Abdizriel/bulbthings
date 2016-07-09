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

  describe('GET /api/assets', () => {

    it('should verify route to asset.controller.index', () => {
      expect(routerStub.get
        .withArgs('/', 'indexCtrl.index')
      ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/assets', () => {

    it('should route to asset.controller.create', () => {
    expect(routerStub.post
      .withArgs('/', 'indexCtrl.create')
    ).to.have.been.calledOnce;
  });

  });

  describe('DELETE /api/assets/:id', () => {

    it('should verify route to asset.controller.destroy', () => {
      expect(routerStub.delete
        .withArgs('/:id', 'indexCtrl.destroy')
      ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/assets/:id', () => {

    it('should verify route to asset.controller.update', () => {
      expect(routerStub.put
        .withArgs('/:id', 'indexCtrl.update')
      ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/assets/:id', () => {

    it('should verify route to asset.controller.show', () => {
      expect(routerStub.get
        .withArgs('/:id', 'indexCtrl.show')
      ).to.have.been.calledOnce;
    });

  });

});
