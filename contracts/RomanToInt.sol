// SPDX-License-Identifier: MIT
pragma solidity ^0.8.34;

contract RomanToInt {
    function romanToInt(string memory s) public pure returns (uint256) {
        // 1. 将字符串转为 bytes 数组，方便通过下标访问
        bytes memory sBytes = bytes(s);
        uint256 length = sBytes.length;
        require(length > 0, "Empty string");

        uint256 total = 0 ;

        // 2. 遍历每一个字符
        for (uint i = 0; i < length; i++) {
            // 获取当前字符和下一个字符（如果 i 是最后一个字符，下一个就是 0）
            uint256 currentVal = charToInt(sBytes[i]);
            // 每次循环的时候，都把nextVal设置为0，这样可以保证i是最后一个字符的时候，下一个值是0
            uint256 nextVal = 0;
            if(i+1 < length){
                nextVal = charToInt(sBytes[i+1]);
            }

            // 3. 核心逻辑：如果当前值小于下一个值，说明是“左减”组合，减去当前值
            if (currentVal < nextVal) {
                total -= currentVal;
            } else {
                total += currentVal;
            }
        }
        return total;
    }

    /**
     * @dev 辅助函数：将单个字节（字符）转换为对应的整数值
     */
    function charToInt(bytes1 char) internal pure returns (uint256) {
        if (char == "I") return 1;
        if (char == "V") return 5;
        if (char == "X") return 10;
        if (char == "L") return 50;
        if (char == "C") return 100;
        if (char == "D") return 500;
        if (char == "M") return 1000;
        revert("Invalid Roman character");
    }
}