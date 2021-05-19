// SPDX-License-Identifier: MIT
pragma solidity ^0.5.9;
pragma experimental ABIEncoderV2;

import "@0x/contracts-utils/contracts/src/LibBytes.sol";

contract VerifySignature {
    using LibBytes for bytes;

    function splitSignature(bytes memory signature)
        public
        pure
        returns (
            bytes32 r,
            bytes32 s,
            uint8 v
        )
    {
        // require(sig.length == 65, "invalid signature length");

        // assembly {
        //     /*
        //     First 32 bytes stores the length of the signature

        //     add(sig, 32) = pointer of sig + 32
        //     effectively, skips first 32 bytes of signature

        //     mload(p) loads next 32 bytes starting at the memory address p into memory
        //     */

        //     // first 32 bytes, after the length prefix
        //     r := mload(add(sig, 32))
        //     // second 32 bytes
        //     s := mload(add(sig, 64))
        //     // final byte (first byte of the next 32 bytes)
        //     v := byte(0, mload(add(sig, 96)))
        // }

        v = uint8(signature[0]);
        r = signature.readBytes32(1);
        s = signature.readBytes32(33);

        // implicitly return (r, s, v)
    }
}
