// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Deposit {
    function balanceOf(address token, address guy)
        external
        view
        returns (uint256)
    {
        return IERC20(token).balanceOf(guy);
    }

    function transfer(
        address token,
        address guy,
        uint256 amount
    ) external returns (bool) {
        return IERC20(token).transfer(guy, amount);
    }
}
