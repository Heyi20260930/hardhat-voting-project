import { expect } from "chai";
import { network } from "hardhat";

const { ethers } = await network.connect();

describe("BinarySearch 合约测试", function () {
  let searchContract: any;

  beforeEach(async function () {
    const BinarySearch = await ethers.getContractFactory("BinarySearch");
    searchContract = await BinarySearch.deploy();
    await searchContract.waitForDeployment();
  });

  it("应该能找到存在于数组中的目标值", async function () {
    const nums = [1, 3, 5, 7, 9, 11];
    
    // 测试找到中间值
    expect(await searchContract.search(nums, 7)).to.equal(3);
    // 测试找到最左边值
    expect(await searchContract.search(nums, 1)).to.equal(0);
    // 测试找到最右边值
    expect(await searchContract.search(nums, 11)).to.equal(5);
  });

  it("如果目标值不存在，应该返回 -1", async function () {
    const nums = [1, 3, 5, 7, 9, 11];
    
    // 目标值比所有元素都小
    expect(await searchContract.search(nums, 0)).to.equal(-1);
    // 目标值比所有元素都大
    expect(await searchContract.search(nums, 12)).to.equal(-1);
    // 目标值在中间但不存在
    expect(await searchContract.search(nums, 6)).to.equal(-1);
  });

  it("应该正确处理空数组", async function () {
    const nums: number[] = [];
    expect(await searchContract.search(nums, 5)).to.equal(-1);
  });

  it("应该正确处理只有一个元素的数组", async function () {
    const nums = [5];
    expect(await searchContract.search(nums, 5)).to.equal(0);
    expect(await searchContract.search(nums, 3)).to.equal(-1);
  });
});