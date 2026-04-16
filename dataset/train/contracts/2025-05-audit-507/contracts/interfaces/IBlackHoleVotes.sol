// SPDX-License-Identifier: None
// BlackHole Foundation 2025

pragma solidity 0.8.13;

import {IVotes} from "@openzeppelin/contracts/governance/utils/IVotes.sol";

interface IBlackHoleVotes is IVotes{
    function getsmNFTPastVotes(address account, uint256 timepoint) external view returns (uint256);

   
    function getsmNFTPastTotalSupply() external view returns (uint256);
}