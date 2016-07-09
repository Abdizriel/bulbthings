'use strict';

import { User } from '../../sqldb';
import { expect } from 'chai';

const genUser = () => {
    user = User.build({
        firstName: 'John',
        lastName: 'Doe',
        email: 'test@example.com'
    });
    return user;
};

let user;

describe('User Model', () => {
    before(() =>{
        return User.sync()
            .then(() => {
                return User.destroy({ where: {} });
            });
    });

    beforeEach(() => {
        genUser();
    });

    afterEach(() => {
        return User.destroy({ where: {} });
    });

    it('should fail when saving a duplicate user', () => {
        return expect(user.save()
            .then(() => {
                const userDup = genUser();
                return userDup.save();
            })).to.be.rejected;
    });

    describe('#firstName', () => {

        it('should fail when saving without an firstName', () => {
            user.firstName = '';
            return expect(user.save()).to.be.rejected;
        });

    });

    describe('#lastName', () => {

        it('should fail when saving without an lastName', () => {
            user.lastName = '';
            return expect(user.save()).to.be.rejected;
        });

    });

    describe('#email', () => {

        it('should fail when saving without an email', () => {
            user.email = '';
            return expect(user.save()).to.be.rejected;
        });

        it('should fail when saving with wrong email', () => {
            user.email = 'test';
            return expect(user.save()).to.be.rejected;
        });

    });

});
