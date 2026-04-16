// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IAlgebraPoolAPIStorage {
    function pairToDeployer(address) external view returns (address);
    function setDeployerForPair(address _pair) external;
    function setDeployerForPair(address _pair, address _deployer) external;
}
