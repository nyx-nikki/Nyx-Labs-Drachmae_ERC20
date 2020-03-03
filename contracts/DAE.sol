pragma solidity 0.5.0;

import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Capped.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Mintable.sol";

/**
 * @title DAE Token Contract
 *
 * @author @wafflemakr
 *
 *  Address:        0xae152746E46F4AE20b7167bEd706B4CEeA38C253
 *  Name:           Drachmae
 *  Symbol:         DAE
 *  Decimals:       4
 *  Initial Supply: 4,200,000.000 (0x3425853Ce9055859b683FA7c6DDe156f2430b6a1)
 *  Max Supply:     420,000,000.0000
 *  Features:       Capped, Mintable
 *  Minters:        0x1cAb97Def5fb15a965E875765Fce94073CB980C4
 *
 */
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
