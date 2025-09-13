import { ethers } from "hardhat";

async function main() {
  const INITIAL_SUPPLY = Number(process.env.INITIAL_SUPPLY || "1000000000"); // 1B
  const DECIMALS = Number(process.env.DECIMALS || "18");
  const OWNER = process.env.OWNER || (await ethers.getSigners())[0].address;

  console.log("Deploying YipCoin with params:");
  console.log({ INITIAL_SUPPLY, DECIMALS, OWNER });

  const YipCoin = await ethers.getContractFactory("YipCoin");
  const token = await YipCoin.deploy(INITIAL_SUPPLY, DECIMALS, OWNER);
  const receipt = await token.deploymentTransaction()?.wait(1);

  console.log(`YipCoin deployed to: ${await token.getAddress()}`);
  if (receipt) {
    console.log(`Tx hash: ${receipt.hash}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
