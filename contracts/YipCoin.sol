// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title YipCoin
 * @notice Minimal, audit-friendly ERC-20 for learning/portfolio purposes.
 *         - Mints fixed initial supply to deployer/owner
 *         - Optional owner-controlled mint (can be renounced for fixed supply)
 */
contract YipCoin is ERC20, Ownable {
    uint8 private immutable _decimals;

    constructor(
        uint256 initialSupply_,   // in whole tokens (not wei), will be scaled by decimals
        uint8 decimals_,          // 0-18
        address owner_
    ) ERC20("YipCoin", "YIP") Ownable(owner_) {
        require(decimals_ <= 18, "decimals too large");
        _decimals = decimals_;
        uint256 scaled = initialSupply_ * (10 ** decimals_);
        _mint(owner_, scaled);
    }

    function decimals() public view override returns (uint8) {
        return _decimals;
    }

    /// @notice Optional mint hook (owner only). Call `renounceOwnership()` to disable.
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
}
