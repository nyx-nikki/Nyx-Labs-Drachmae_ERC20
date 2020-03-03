pragma solidity 0.5.0;

import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Capped.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Mintable.sol";

contract DAE is ERC20Detailed, ERC20Mintable, ERC20Capped {
    constructor()
        public
        ERC20Detailed("Drachmae", "DAE", 4)
        ERC20Capped(420e6 * 10**uint256(4))
    {
        _mint(
            0x3425853Ce9055859b683FA7c6DDe156f2430b6a1,
            42e5 * 10**uint256(4)
        );
    }

}
