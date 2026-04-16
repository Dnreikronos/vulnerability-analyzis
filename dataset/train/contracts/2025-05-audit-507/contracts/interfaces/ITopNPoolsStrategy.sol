// SPDX-License-Identifier: MIT 
pragma solidity 0.8.13;

interface ITopNPoolsStrategy {
    function getTopNPools() external view returns (address[] memory );
    function setAVM(address _avm) external;
    function setTopN() external;
}
