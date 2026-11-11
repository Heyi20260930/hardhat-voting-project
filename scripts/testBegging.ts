import { network } from "hardhat";
import { ethers } from "ethers";

async function main() {
  // 1. 连接到 Sepolia 测试网
  console.log("正在连接 Sepolia 网络...");
  const connection = await network.connect({ network: "sepolia" });
  
  // 获取测试账户（会自动使用你 Keystore 里存的私钥）
  const accounts = await connection.ethers.getSigners();
  const signer = accounts[0];
  console.log("当前测试账户地址:", signer.address);

  // 2. 绑定你已经部署的合约地址
  const contractAddress = "0xFB2126e0683F2D771D2CCE3a03a0133dad6996EC";
  
  // 使用 Hardhat 编译出来的 ABI 绑定合约
  const BeggingContract = await connection.ethers.getContractFactory("BeggingContract");
  const contract = BeggingContract.attach(contractAddress) as any;

  console.log("\n================ 开始测试 ================");

  // 3. 测试 donate（捐款 0.01 ETH）
  console.log("⏳ 正在发送 0.01 SepoliaETH 捐款...");
  const donateTx = await contract.donate({ value: ethers.parseEther("0.01") });
  console.log("等待交易确认中...");
  await donateTx.wait();
  console.log("✅ 捐款成功！交易哈希:", donateTx.hash);

  // 4. 测试 getDonation（查询捐款金额）
  console.log("\n🔍 正在查询当前账户的捐款金额...");
  const myDonation = await contract.getDonation(signer.address);
  console.log("✅ 当前合约记录的你的捐款额 (wei):", myDonation.toString());

  // 5. 测试 withdraw（提款）
  console.log("\n⏳ 正在尝试提取合约资金...");
  const withdrawTx = await contract.withdraw();
  console.log("等待交易确认中...");
  await withdrawTx.wait();
  console.log("✅ 提款成功！交易哈希:", withdrawTx.hash);

  console.log("\n================ 测试完成 ================");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});