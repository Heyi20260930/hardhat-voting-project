// 用 solidity 实现整数转罗马数字

pragma solidity ^0.8.34;

contract RomanNumeral {

    function intToRoman(uint256 num) public pure returns (string memory) {
        // 罗马数字：1~399之间的正整数
        require(num >0 && num <4000,"Input must be between 1 and 3999");

        // 1.定义数值数据（从大到小）
        uint256[13] memory values = [
            uint256(1000), uint256(900), uint256(500), uint256(400),
            uint256(100),  uint256(90),  uint256(50),  uint256(40),
            uint256(10),   uint256(9),   uint256(5),   uint256(4),
            uint256(1)
        ];

        // 2.定义对应的罗马数字符号数组(核心防坑：直接把符号定义为 bytes 数组，彻底绕开string转bytes的坑)
        bytes[13] memory symbols = [
            bytes("M"), bytes("CM"), bytes("D"), bytes("CD"),
            bytes("C"), bytes("XC"), bytes("L"), bytes("XL"),
            bytes("X"), bytes("IX"), bytes("V"), bytes("IV"),
            bytes("I")
        ];

        // 3.用于存储最终结果的字节数组
        bytes memory result = new bytes(15);
        uint256 resultIndex = 0;

        //4.贪心算法遍历
        for (uint256 i = 0; i <13; i++) {
            while (num >= values[i]) {
                num -= values[i];

                bytes memory symbolBytes = bytes(symbols[i]);
                for (uint256 j = 0; j < symbolBytes.length; j++) {
                    result[resultIndex] = symbolBytes[j];
                    resultIndex++;
                }
            }
        }

        // 5. 动态调节数组的长度(因为solidity语言不是java等高级语言，
        //    需要我们自己去处理数组的长度，否则数组里面的空字符串会返回0x00)
        bytes memory finalResult = new bytes(resultIndex);
        for (uint256 k = 0; k < resultIndex; k++) {
            finalResult[k] = result[k];
        }

        // 6.转换位字符串返回
        return string(finalResult);

    }

}