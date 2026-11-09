// SPDX-License-Identifier: MIT
pragma solidity ^0.8.34;

contract Voting {
    // 1. 使用 mapping 存储候选人的得票数
    // key 是候选人的名字 (string)，value 是得票数 (uint256)
    mapping(string=>uint256) public votes;

    // 额外增加：记录已经投过票的地址，防止重复投票
    mapping(address=>bool) public hasVoted;

    // 事件：当有人投票时触发，方便前端监听
    event Voted(address indexed voter, string indexed candidate);

    // 2. vote 函数：允许用户投票给某个候选人
    function vote(string memory _candidate) public {
        require(!hasVoted[msg.sender],"You have already voted.");
        hasVoted[msg.sender] = true;
        votes[_candidate] += 1;
        emit Voted(msg.sender, _candidate);
    }

    // 3. getVotes 函数：返回某个候选人的得票数
    function getVotes(string memory _candidate) public view returns (uint256) {
        return votes[_candidate];
    }

    // 4. resetVotes 函数：重置所有候选人的得票数
    // 注意：如果候选人很多，遍历重置可能会消耗大量 Gas，这里简单模拟。实际生产中会采用更高效的设计（如记录一个 epoch 版本号）。
    function resetVotes(string[] memory _candidates) public {
        for (uint256 i = 0; i < _candidates.length; i++) {
            votes[_candidates[i]] = 0;
        }
    }

}
