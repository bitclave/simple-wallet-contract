// @flow
'use strict'

const BigNumber = web3.BigNumber;
const expect = require('chai').expect;
const should = require('chai')
    .use(require('chai-as-promised'))
    .use(require('chai-bignumber')(web3.BigNumber))
    .should();

import ether from './helpers/ether';
import {advanceBlock} from './helpers/advanceToBlock';
import {increaseTimeTo, duration} from './helpers/increaseTime';
import latestTime from './helpers/latestTime';
import EVMThrow from './helpers/EVMThrow';

const SimpleWallet = artifacts.require('./SimpleWallet.sol');

contract('SimpleWallet', function([_, ownerWallet, wallet, wallet1, wallet2, wallet3]) {

    var simpleWallet;

    before(async function() {
        simpleWallet = await SimpleWallet.new();
    })

    it('should receive payments', async function() {
        const balance = (await web3.eth.getBalance(simpleWallet.address)).toNumber();

        await simpleWallet.sendTransaction({value: 1, from: wallet1}).should.be.fulfilled;
        (await web3.eth.getBalance(simpleWallet.address)).should.be.bignumber.equal(balance + 1);

        await simpleWallet.sendTransaction({value: 2, from: wallet2}).should.be.fulfilled;
        (await web3.eth.getBalance(simpleWallet.address)).should.be.bignumber.equal(balance + 3);
    })

    it('should claim payments', async function() {
        const balance = (await web3.eth.getBalance(simpleWallet.address)).toNumber();

        await simpleWallet.sendTransaction({value: 3, from: wallet3}).should.be.fulfilled;
        (await web3.eth.getBalance(simpleWallet.address)).should.be.bignumber.equal(balance + 3);

        const walletBalance = new BigNumber((await web3.eth.getBalance(ownerWallet)).toNumber());
        await simpleWallet.claim(ownerWallet);
        (await web3.eth.getBalance(simpleWallet.address)).should.be.bignumber.equal(0);
        (await web3.eth.getBalance(ownerWallet)).should.be.bignumber.equal(walletBalance.add(balance + 3));
    })

})
