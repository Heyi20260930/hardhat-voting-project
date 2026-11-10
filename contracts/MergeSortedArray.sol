// SPDX-License-Identifier: MIT
pragma solidity ^0.8.34;

contract MergeSortedArray {

    function merge(uint256[] memory arr1, uint256[] memory arr2) public pure returns (uint256[] memory) {
        uint256 len1 = arr1.length;
        uint256 len2 = arr2.length;

        // 如果其中一个为空，直接返回另一个
        if(len1 == 0) return arr2;
        if(len2 == 0) return arr1;
    

        // 1. 预分配空间：合并后的数组长度必然是 len1 + len2
        uint256[] memory result = new uint256[] (len1 + len2);

        // 2. 定义双指针
        uint256 i = 0; // 指向 arr1 的当前元素
        uint256 j = 0; // 指向 arr2 的当前元素
        uint256 k = 0; // 指向 result 的当前写入位置

        // 3. 双指针遍历：当两个数组都还有元素时
        while(i< len1 && j < len2){
            if(arr1[i] <= arr2[j]){
                result[k] = arr1[i];
                i++;
            }else {
                result[k] = arr2[j];
                j++;
            }
            k++;
        }

        // 4. 收尾工作：如果 arr1 还有剩余，全部拷贝过去
        while (i < len1) {
            result[k] = arr1[i];
            k++;
            i++;
        }

        // 5. 收尾工作：如果 arr2 还有剩余，全部拷贝过去
        while (j < len2) {
            result[k] = arr2[j];
            k++;
            j++;
        }
        
        return result;
    }
}