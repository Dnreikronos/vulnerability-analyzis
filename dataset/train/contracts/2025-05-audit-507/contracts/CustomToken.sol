// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CustomToken is ERC20, Ownable {
    uint256 private immutable _initialSupply;

    /**
     * @dev Constructor to initialize token name, symbol, and initial supply.
     * @param name_ Name of the token.
     * @param symbol_ Symbol of the token.
     * @param initialSupply_ Initial supply of the token (in whole units, converted to smallest unit).
     */
    constructor(
        string memory name_,
        string memory symbol_,
        uint256 initialSupply_
    ) ERC20(name_, symbol_) Ownable() {
        _initialSupply = initialSupply_ * 10 ** decimals();
        _mint(msg.sender, _initialSupply);
    }

    /**
     * @dev Mint new tokens. Only the owner can call this function.
     * @param account Address to receive the minted tokens.
     * @param amount Amount of tokens to be minted.
     */
    function mint(address account, uint256 amount) external onlyOwner {
        _mint(account, amount);
    }

    /**
     * @dev Burn tokens from an account. Only the owner can call this function.
     * @param account Address whose tokens will be burned.
     * @param amount Amount of tokens to be burned.
     */
    function burn(address account, uint256 amount) external onlyOwner {
        _burn(account, amount);
    }
}
