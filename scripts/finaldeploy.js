const hre = require('hardhat');

async function main() {
  const chai = await hre.ethers.getContractFactory('chai');
  const contract = await chai.deploy();
  await contract.waitForDeployment();

  console.log('Address ', contract.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
