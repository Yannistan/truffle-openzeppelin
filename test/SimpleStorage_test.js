/* eslint-disable no-unused-expressions */
const { accounts, contract } = require('@openzeppelin/test-environment');

const { BN, expectRevert, time } = require('@openzeppelin/test-helpers');

const { expect } = require('chai');

const SimpleStorage = contract.fromArtifact('SimpleStorage');

describe('SimpleStorage', async function () {
  const [dev, owner, user1] = accounts;
  const STOREDDATA = new BN('50' + '0'.repeat(0));
  const _VALUE = new BN('40' + '0'.repeat(0));
  //const STOREDDATA = 50;
  //const _VALUE = 40;

  context('SimpleStorage initial state', function () {
    // Execute this before each tests
    beforeEach(async function () {
      this.simplestorage = await SimpleStorage.new(owner, _VALUE, { from: dev });
    });

    it(`has stored data ${STOREDDATA}`, async function () {
      expect(await this.simplestorage.get()).to.be.a.bignumber.equal(STOREDDATA);
    });

    it('has owner', async function () {
      expect(await this.simplestorage.owner()).to.equal(owner);
    });
  });

  context('SimpleStorage ownership', function () {
    beforeEach(async function () {
      this.simplestorage = await SimpleStorage.new(owner, STOREDDATA, { from: dev });
    });
    it('set value', async function () {
      await this.simplestorage.set(_VALUE, { from: owner });
      expect(await this.simplestorage.get()).to.be.a.bignumber.equal(_VALUE);
    });

    it('reverts if set is not called by owner', async function () {
      await expectRevert(this.simplestorage.set(_VALUE, { from: user1 }), 'Ownable: caller is not the owner');
    });
  });
});
