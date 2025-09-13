import { expect } from "chai";
import { ethers } from "hardhat";

describe("YipCoin", function () {
  it("mints initial supply to owner", async function () {
    const [owner] = await ethers.getSigners();
    const YipCoin = await ethers.getContractFactory("YipCoin");
    const token = await YipCoin.deploy(1000, 18, owner.address);
    const bal = await token.balanceOf(owner.address);
    expect(bal).to.equal(ethers.parseUnits("1000", 18));
    expect(await token.name()).to.equal("YipCoin");
    expect(await token.symbol()).to.equal("YIP");
  });

  it("respects custom decimals", async function () {
    const [owner] = await ethers.getSigners();
    const YipCoin = await ethers.getContractFactory("YipCoin");
    const token = await YipCoin.deploy(1000, 6, owner.address);
    expect(await token.decimals()).to.equal(6);
  });

  it("owner can mint, others cannot", async function () {
    const [owner, alice] = await ethers.getSigners();
    const YipCoin = await ethers.getContractFactory("YipCoin");
    const token = await YipCoin.deploy(0, 18, owner.address);
    await token.mint(alice.address, ethers.parseUnits("42", 18));
    expect(await token.balanceOf(alice.address)).to.equal(ethers.parseUnits("42", 18));

    await expect(token.connect(alice).mint(alice.address, 1)).to.be.revertedWithCustomError(
      token,
      "OwnableUnauthorizedAccount"
    );
  });
});
