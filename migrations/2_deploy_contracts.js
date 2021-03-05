const EventManager = artifacts.require("EventManager");
const EventCreator = artifacts.require("EventCreator");

module.exports = function(deployer) {
  // Deploy the EventCreator contract first, passing its
  // address to the EventManager contract constructor
  deployer.deploy(EventCreator).then(function() {
    return deployer.deploy(EventManager, EventCreator.address);
  }).then(function() { })
};
