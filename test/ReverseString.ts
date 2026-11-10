import { expect } from "chai";
import { network } from "hardhat";

const { ethers } = await network.connect();

describe("ReverseString 合约测试", function () {
  let reverseStringContract: any;

  beforeEach(async function () {
    const ReverseString = await ethers.getContractFactory("ReverseString");
    reverseStringContract = await ReverseString.deploy();
    await reverseStringContract.waitForDeployment();
  });

  it("应该正确反转普通英文字符串", async function () {
    const input = "abcde";
    const expected = "edcba";
    
    const result = await reverseStringContract.reverse(input);
    expect(result).to.equal(expected);
  });

  it("应该正确处理空字符串", async function () {
    const input = "";
    const expected = "";
    
    const result = await reverseStringContract.reverse(input);
    expect(result).to.equal(expected);
  });

  it("应该正确处理回文字符串", async function () {
    const input = "madam"; // 回文，反转后还是自己
    const expected = "madam";
    
    const result = await reverseStringContract.reverse(input);
    expect(result).to.equal(expected);
  });

  it("应该正确处理包含数字和符号的字符串", async function () {
    const input = "123!@#";
    const expected = "#@!321";
    
    const result = await reverseStringContract.reverse(input);
    expect(result).to.equal(expected);
  });
});