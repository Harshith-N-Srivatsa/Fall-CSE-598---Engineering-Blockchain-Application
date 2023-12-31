const hre = require('hardhat');

async function getbalances(address) {
  const balancebigint = await hre.ethers.provider.getBalance(address);

  return hre.ethers.formatEther(balancebigint);
}

async function consolebalances(addresses) {
  for (const address of addresses) {
    console.log(`Address balance:`, await getbalances(address));
  }
}

async function consolememos(memos) {
  for (const memo of memos) {
    const timestamp = memo.timestamp;
    const name = memo.name;
    const from = memo.from;
    const message = memo.message;
    console.log(
      ` At ${timestamp},name ${name}, address ${from} , message ${message}`
    );
  }
}

async function main() {
  const [owner, from1, from2, from3] = await hre.ethers.getSigners();
  const chai = await hre.ethers.getContractFactory('chai');
  const contract = await chai.deploy();
  await contract.waitForDeployment();

  console.log('Address ', contract.target);

  const addresses = [
    owner.address,
    from1.address,
    from2.address,
    from3.address,
  ];
  console.log('Before Buying Coffee');
  await consolebalances(addresses);

  const amount = { value: hre.ethers.parseEther('1') };
  await contract.connect(from1).buychai('from1', 'Very Nice Coffee', amount);
  await contract
    .connect(from2)
    .buychai('from1', 'Very Nice Coffee from user 2', amount);
  await contract
    .connect(from3)
    .buychai('from1', 'Very Nice Information', amount);

  console.log('After Buying Coffee');
  await consolebalances(addresses);

  const memos = await contract.getmemos();
  consolememos(memos);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
