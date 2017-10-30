const SimpleWallet = artifacts.require("SimpleWallet");

module.exports = function(deployer) {
    //constructor arguments only for demo! You should be used real data for deploy
	deployer.deploy(SimpleWallet);
};
