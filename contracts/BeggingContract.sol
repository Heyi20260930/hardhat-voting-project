// SPDX-License-Identifier: MIT
pragma solidity ^0.8.34;

contract BeggingContract {
    // 1. 记录每个捐赠者的捐赠金额
    mapping (address => uint256) public donations;

    // 记录所有捐赠过的人（用于排行榜统计，避免遍历整个 mapping）
    address[] public donors;

    // 合约所有者
    address public owner;

    // 时间限制（假设当前时间之后才能捐赠，这里设为合约部署时间起 1 天后）
    uint256 public startTime;
    uint256 public endTime;

    // 捐赠事件
    event Donation(address indexed donor, uint256 amount);

    // 提款事件
    event Withdrawal(address indexed owner, uint256 amount);

    // 权限修饰符
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this");
        _;
    }

    // 构造函数
    constructor() {
        owner = msg.sender;
        startTime = block.timestamp;
        endTime = block.timestamp + 7 days;
    }

     // 2. 捐赠函数
     function donate() external payable {
        // 时间限制校验
        require(block.timestamp >= startTime && block.timestamp <= endTime, "Not in donation period");
        
        // 校验捐赠金额必须大于 0
        require(msg.value > 0, "Donation must be greater than 0");
     

    // 如果是首次捐赠，加入捐赠者名单
    if (donations[msg.sender] == 0) {
           donors.push(msg.sender);
    }

    // 记录捐赠金额
    donations[msg.sender] += msg.value;

    // 触发事件
    emit Donation(msg.sender, msg.value);
    }

    // 3. 查询捐赠金额
    function getDonation(address _donor) external view returns (uint256) {
        return donations[_donor];
    }

    // 4. 提款函数
    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");

        // 安全实践：先改变状态（如果有的话），再进行外部调用（防重入）
        // 使用 call 发送资金，并检查是否成功
        (bool success, ) = payable(owner).call{value: balance}("");
        require(success, "Transfer failed");

        emit Withdrawal(owner, balance);
    }







}