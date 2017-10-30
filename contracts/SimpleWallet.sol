pragma solidity ^0.4.11;

import "zeppelin-solidity/contracts/ownership/Ownable.sol";


contract SimpleWallet is Ownable {

    function () public payable {
    }

    function claim(address destination) public onlyOwner {
        destination.transfer(this.balance);
    }

}