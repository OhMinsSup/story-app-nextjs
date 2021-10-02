const StoryToken = artifacts.require('./StoryToken.sol');
const fs = require('fs');

module.exports = function (deployer) {
  deployer.deploy(StoryToken).then(() => {
    if (StoryToken._json) {
      // 1. Record recently deployed contract's abi file to 'deployedABI'
      fs.writeFile(
        'deployedABI',
        JSON.stringify(StoryToken._json.abi, 2),
        (err) => {
          if (err) throw err;
          console.log(
            `The abi of ${StoryToken._json.contractName} is recorded on deployedABI file`,
          );
        },
      );
    }

    // 2. Record recently deployed contract's address to 'deployedAddress'
    fs.writeFile('deployedAddress', StoryToken.address, (err) => {
      if (err) throw err;
      console.log(
        `The deployed contract address * ${StoryToken.address} * is recorded on deployedAddress file`,
      );
    });
  });
};
