// SPDX-License-Identifier: MIT
import "hardhat/console.sol";

pragma solidity ^0.8.34;

contract ReverseString {

    function reverse(string memory _str) public pure returns (string memory) {
        bytes memory strBytes = bytes(_str);

        uint256 length = strBytes.length;

        bytes memory reversedBytes = new bytes(length);

        for (uint256 i = 0; i < length; i++) {
            reversedBytes[i] = strBytes[length -1 -i];
        }

        // 在合约内部打印日志
        console.log(unicode"原始字符串:");
        console.log(_str);
        console.log(unicode"反转字符串:", string(reversedBytes));

        return string(reversedBytes);

    }


}