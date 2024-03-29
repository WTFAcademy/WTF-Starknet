// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts for Cairo v0.6.1 (token/erc1155/IERC1155.cairo)

%lang starknet

from starkware.cairo.common.uint256 import Uint256

@contract_interface
namespace ISBT {

    // ERC165
    func supportsInterface(interfaceId: felt) -> (success: felt) {
    }

    func uri(id: Uint256) -> (uri: felt) {
    }

    func balanceOf(account: felt, id: Uint256) -> (balance: Uint256) {
    }

    func balanceOfBatch(
        accounts_len: felt,
        accounts: felt*,
        ids_len: felt,
        ids: Uint256*
    ) -> (
        balances_len: felt,
        balances: Uint256*
    ) {
    }

    func isApprovedForAll(account: felt, operator: felt) -> (approved: felt) {
    }

    func owner() -> (owner: felt) {
    }

    func setApprovalForAll(operator: felt, approved: felt) {
    }

    func safeTransferFrom(
        from_: felt,
        to: felt,
        id: Uint256,
        value: Uint256,
        data_len: felt,
        data: felt*
    ) {
    }

    func safeBatchTransferFrom(
        from_: felt,
        to: felt,
        ids_len: felt,
        ids: Uint256*,
        values_len: felt,
        values: Uint256*,
        data_len: felt,
        data: felt*,
    ) {
    }

    func mint(
        to: felt,
        id: Uint256,
        value: Uint256,
        data_len: felt,
        data: felt*
    ) {
    }

    func mintBatch(
        to: felt,
        ids_len: felt,
        ids: Uint256*,
        values_len: felt,
        values: Uint256*,
        data_len: felt,
        data: felt*,
    ) {
    }

    func burn(
        from_:felt,
        id: Uint256,
        value: Uint256,
    ) {
    }

    func transferOwnership(newOwner: felt) {
    }

    func renounceOwnership() {
    }
}