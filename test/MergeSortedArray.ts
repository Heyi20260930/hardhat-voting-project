import { expect } from "chai";
import { network } from "hardhat";

const { ethers } = await network.connect();

describe("MergeSortedArray 合约测试", function () {
  let mergeContract: any;

  beforeEach(async function () {
    const MergeSortedArray = await ethers.getContractFactory("MergeSortedArray");
    mergeContract = await MergeSortedArray.deploy();
    await mergeContract.waitForDeployment();
  });

  it("应该正确合并两个普通有序数组", async function () {
    const arr1 = [1, 3, 5];
    const arr2 = [2, 4, 6];
    const result = await mergeContract.merge(arr1, arr2);
    // 注意：通过 ethers 拿到的返回值是 BigNumber 数组，比较时最好转成字符串或用 map(Number)
    expect(result.map(Number)).to.deep.equal([1, 2, 3, 4, 5, 6]);
  });

  it("应该正确处理包含重复数字的数组", async function () {
    const arr1 = [1, 2, 2, 5];
    const arr2 = [2, 2, 3];
    const result = await mergeContract.merge(arr1, arr2);
    expect(result.map(Number)).to.deep.equal([1, 2, 2, 2, 2, 3, 5]);
  });

  it("当一个数组为空时，应该直接返回另一个数组", async function () {
    const arr1: number[] = [];
    const arr2 = [1, 2, 3];
    const result = await mergeContract.merge(arr1, arr2);
    expect(result.map(Number)).to.deep.equal([1, 2, 3]);
  });

  it("当两个数组都为空时，应该返回空数组", async function () {
    const arr1: number[] = [];
    const arr2: number[] = [];
    const result = await mergeContract.merge(arr1, arr2);
    expect(result.length).to.equal(0);
  });
});