const PazToken = artifacts.require("PazToken");

module.exports = function (deployer) {
  deployer.deploy(PazToken , 1000000);
};
