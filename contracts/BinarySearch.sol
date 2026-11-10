// SPDX-License-Identifier: MIT
pragma solidity ^0.8.34;

contract BinarySearch {

    function search(uint256[] memory nums, uint256 target) public pure returns (int256) {
        uint256 left = 0;
        // 所以这里先判断，或者用另一种循环条件。
        if (nums.length == 0) {
            return -1;
        }
        uint256 right = nums.length - 1;

        // 当 left <= right 时继续查找
        while (left <= right) {
            // 防溢出写法： (left + right) / 2 如果两数极大可能会溢出
            // 推荐写法：left + (right - left) / 2
            uint256 mid = left + (right - left) / 2;

            if (nums[mid] == target) {
                return int256(mid); // 找到了，返回索引
            } else if (nums[mid] < target) {
                left = mid + 1; // 目标在右侧，移动左边界
            } else {
                // 因为 mid 是 uint256，如果 mid 是 0 且需要减 1，会下溢报错
                // 所以先判断 mid > 0
                if (mid == 0) {
                    break; 
                }
                right = mid - 1; // 目标在左侧，移动右边界
            }
        }

        return -1; // 没找到
    }
}