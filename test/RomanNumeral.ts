import { expect } from "chai";
import { network } from "hardhat";

const { ethers } = await network.connect();

describe("RomanNumeral 合约测试", function () {
  let romanContract: any;

  beforeEach(async function () {
    const RomanNumeral = await ethers.getContractFactory("RomanNumeral");
    romanContract = await RomanNumeral.deploy();
    await romanContract.waitForDeployment();
  });

  it("应该正确转换普通数字", async function () {
    expect(await romanContract.intToRoman(3)).to.equal("III");
    expect(await romanContract.intToRoman(58)).to.equal("LVIII");
    expect(await romanContract.intToRoman(1994)).to.equal("MCMXCIV");
  });

  it("应该正确处理边界最大值", async function () {
    expect(await romanContract.intToRoman(3999)).to.equal("MMMCMXCIX");
  });

  it("应该拒绝非法数字（0 或大于 3999）", async function () {
    await expect(romanContract.intToRoman(0)).to.be.revertedWith(
      "Input must be between 1 and 3999"
    );
    await expect(romanContract.intToRoman(4000)).to.be.revertedWith(
      "Input must be between 1 and 3999"
    );
  });
});