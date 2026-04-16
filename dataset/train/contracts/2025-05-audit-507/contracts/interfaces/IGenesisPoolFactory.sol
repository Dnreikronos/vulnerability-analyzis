// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

interface IGenesisPoolFactory {
    function getGenesisPool(address nativeToken) external view returns (address);
    function getGenesisPools(address nativeToken) external view returns (address[] memory);
    function allGenesisPools(uint index) external returns (address);

    function genesisPoolsLength() external view returns (uint256);
    function createGenesisPool(address tokenOwner, address nativeToken, address fundingToken) external returns (address);
    function removeGenesisPool(address nativeToken) external;
    function removeGenesisPool(address nativeToken, uint256 i) external;
}