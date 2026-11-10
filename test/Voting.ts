import hardhatEthers from "@nomicfoundation/hardhat-ethers";
import { expect } from "chai";
import { network } from "hardhat";

const { ethers } = await network.connect();

describe("Voting 合约测试", function () {
  let voting: any;
  let owner: any;
  let addr1: any;
  let addr2: any;

  // 每个测试用例运行前，都会重新部署一个新合约
  beforeEach(async function () {
    // 获取测试账户
    [owner, addr1, addr2] = await ethers.getSigners();

    // 部署合约
    const Voting = await ethers.getContractFactory("Voting");
    voting = await Voting.deploy();
    await voting.waitForDeployment();
  });

  describe("投票功能 (vote)", function () {
    it("应该允许用户投票并增加对应候选人的票数", async function () {
      const candidate = "Alice";
      
      // 账户1 给 Alice 投票
      await voting.connect(addr1).vote(candidate);
      
      // 验证 Alice 的票数是否为 1
      expect(await voting.getVotes(candidate)).to.equal(1);
      
      // 验证账户1 的状态是否变为已投票
      expect(await voting.hasVoted(addr1.address)).to.be.true;
    });

    it("应该触发 Voted 事件", async function () {
      const candidate = "Bob";
      
      // 验证事件触发：调用 vote 时，会抛出包含 voter 和 candidate 的 Voted 事件
      await expect(voting.connect(addr1).vote(candidate))
        .to.emit(voting, "Voted")
        .withArgs(addr1.address, candidate);
    });

    it("应该阻止同一个地址重复投票", async function () {
      const candidate = "Charlie";
      
      // 账户1 第一次投票，成功
      await voting.connect(addr1).vote(candidate);
      
      // 账户1 第二次投票，应该触发 revert 报错
      await expect(
        voting.connect(addr1).vote(candidate)
      ).to.be.revertedWith("You have already voted.");
    });
  });

  describe("查询功能 (getVotes)", function () {
    it("应该返回 0 如果候选人没有任何得票", async function () {
      expect(await voting.getVotes("Nobody")).to.equal(0);
    });

    it("应该正确统计多个候选人的票数", async function () {
      await voting.connect(addr1).vote("Alice");
      await voting.connect(addr2).vote("Alice");
      await voting.connect(addr1).vote("Bob");

      expect(await voting.getVotes("Alice")).to.equal(2);
      expect(await voting.getVotes("Bob")).to.equal(1);
    });
  });

  describe("重置功能 (resetVotes)", function () {
    it("应该将指定候选人的票数重置为 0", async function () {
      // 先投几票
      await voting.connect(addr1).vote("Alice");
      await voting.connect(addr2).vote("Bob");
      
      expect(await voting.getVotes("Alice")).to.equal(1);
      expect(await voting.getVotes("Bob")).to.equal(1);

      // 传入需要重置的候选人数组 ["Alice", "Bob"]
      await voting.resetVotes(["Alice", "Bob"]);

      // 验证是否归零
      expect(await voting.getVotes("Alice")).to.equal(0);
      expect(await voting.getVotes("Bob")).to.equal(0);
    });
  });
});