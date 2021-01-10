// SPDX-License-Identifier: MIT
import "@openzeppelin/contracts/math/SafeMath.sol";
pragma solidity ^0.6.0;

// SafeMath usage demonstration
contract Calc {
    using SafeMath for uint256;

    function myadd(uint256 a, uint256 b) public pure returns (uint256) {
        return a.add(b);
    }

    function mysub(uint256 a, uint256 b) public pure returns (uint256) {
        return a.sub(b, "Calc: depassement de tampon");
    }

    function mymul(uint256 a, uint256 b) public pure returns (uint256) {
        return a.mul(b);
    }

    function mydiv(uint256 a, uint256 b) public pure returns (uint256) {
        return a.div(b);
    }
}

contract Counter {
    using SafeMath for uint256;

    uint256 private _counter;

    function counter() public view returns (uint256) {
        return _counter;
    }

    function inc(uint256 nb) public {
        _counter = _counter.add(nb);
    }
}
