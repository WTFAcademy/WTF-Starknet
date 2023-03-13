%lang starknet

from starkware.cairo.common.uint256 import Uint256
from starkware.cairo.common.cairo_builtins import HashBuiltin
from starkware.cairo.common.cairo_builtins import BitwiseBuiltin
from starkware.cairo.common.math import assert_not_equal
from starkware.cairo.common.alloc import alloc

from interfaces.ISBT import ISBT

const URI = 'ipfs:/';

const ADMIN_PK = 101;
const FREN_PK = 201;

@external 
func __setup__() {
    %{
        context.admin = deploy_contract("./lib/cairo_contracts/src/openzeppelin/account/presets/Account.cairo", 
            [ids.ADMIN_PK]
        ).contract_address

        context.fren = deploy_contract("./lib/cairo_contracts/src/openzeppelin/account/presets/Account.cairo", 
            [ids.FREN_PK]
        ).contract_address

        context.uri = ids.URI
        context.sbt_address = deploy_contract("./src/SBT.cairo", [context.uri, context.admin]).contract_address
    %}
    return ();
}

@external
func test_deploy{syscall_ptr: felt*, range_check_ptr}(
) {
    alloc_locals;
    local sbt_address;
    local admin;
    local fren;

    %{
        ids.admin = context.admin
        ids.fren = context.fren
        ids.sbt_address = context.sbt_address
    %}

    let one_as_uint256: Uint256 = Uint256(1, 0);
    let zero_as_uint256: Uint256 = Uint256(0, 0);

    let (_uri) = ISBT.uri(sbt_address, Uint256(0,0));
    assert URI = _uri;

    let (owner) = ISBT.owner(sbt_address);
    assert admin = owner;

    // transferOwnership
    %{ stop_prank = start_prank(ids.admin, ids.sbt_address) %}
    ISBT.transferOwnership(contract_address=sbt_address, newOwner=fren);
    %{ stop_prank() %}

    let (owner) = ISBT.owner(sbt_address);
    assert fren = owner;

    // renounceOwnership
    %{ stop_prank = start_prank(ids.fren, ids.sbt_address) %}
    ISBT.renounceOwnership(contract_address=sbt_address);
    %{ stop_prank() %}

    let (owner) = ISBT.owner(sbt_address);
    assert 0 = owner;

    %{  
        print("Deploy successful")
        print(ids.URI)
    %}
    return();
}

@external
func test_mint{syscall_ptr: felt*, range_check_ptr}(
) {
    alloc_locals;
    local sbt_address;
    local admin;
    local fren;

    %{
        ids.admin = context.admin
        ids.fren = context.fren
        ids.sbt_address = context.sbt_address
    %}

    let one_as_uint256: Uint256 = Uint256(1, 0);
    let zero_as_uint256: Uint256 = Uint256(0, 0);

    let (local data: felt*) = alloc();

    // mint
    %{ stop_prank = start_prank(ids.admin, ids.sbt_address) %}
    ISBT.mint(contract_address=sbt_address, to=fren, id=one_as_uint256, value=one_as_uint256, data_len=0, data=data);
    %{ stop_prank() %}

    // balanceOf
    let (balance) = ISBT.balanceOf(sbt_address, fren, one_as_uint256);
    assert one_as_uint256 = balance;

    // isApprovedForAll
    let (approved) = ISBT.isApprovedForAll(contract_address=sbt_address, account=fren, operator=admin);
    assert 0 = approved;

    %{
        print("mint test successful")
    %}

    // mint by unauthorized
    %{ expect_revert(error_message="Ownable: caller is not the owner") %}
    %{ stop_prank = start_prank(ids.fren, ids.sbt_address) %}
    ISBT.mint(contract_address=sbt_address, to=fren, id=one_as_uint256, value=one_as_uint256, data_len=0, data=data);
    %{ stop_prank() %}

    %{
        print("expect revert: don't print this")
    %}
    return();
}

@external
func test_mint_batch{syscall_ptr: felt*, range_check_ptr}(
) {
    alloc_locals;
    local sbt_address;
    local admin;
    local fren;

    %{
        ids.admin = context.admin
        ids.fren = context.fren
        ids.sbt_address = context.sbt_address
    %}

    let one_as_uint256: Uint256 = Uint256(1, 0);
    let zero_as_uint256: Uint256 = Uint256(0, 0);
    let two_as_uint256: Uint256 = Uint256(2, 0);

    let (local data: felt*) = alloc();

    let (local ids: Uint256*) = alloc();
    assert ids[0] = zero_as_uint256;
    assert ids[1] = one_as_uint256;
    assert ids[2] = two_as_uint256;

    let(local values: Uint256*) = alloc();
    assert values[0] = one_as_uint256;
    assert values[1] = one_as_uint256;
    assert values[2] = one_as_uint256;

    // mintBatch
    %{ stop_prank = start_prank(ids.admin, ids.sbt_address) %}
    ISBT.mintBatch(contract_address=sbt_address, to=fren, ids_len=3, ids=ids, values_len=3, values=values, data_len=0, data=data);
    %{ stop_prank() %}

    // balanceOf
    let (balance) = ISBT.balanceOf(sbt_address, fren, zero_as_uint256);
    assert one_as_uint256 = balance;

    let (balance) = ISBT.balanceOf(sbt_address, fren, one_as_uint256);
    assert one_as_uint256 = balance;

    let (balance) = ISBT.balanceOf(sbt_address, fren, two_as_uint256);
    assert one_as_uint256 = balance;

    %{
        print("mintBatch test successful")
    %}

    // mintBatch by unauthorized
    %{ expect_revert(error_message="Ownable: caller is not the owner") %}
    %{ stop_prank = start_prank(ids.fren, ids.sbt_address) %}
        ISBT.mintBatch(contract_address=sbt_address, to=fren, ids_len=3, ids=ids, values_len=3, values=values, data_len=0, data=data);
    %{ stop_prank() %}

    %{
        print("expect revert: don't print this")
    %}
    return();
}

@external
func test_burn{syscall_ptr: felt*, range_check_ptr}(
) {
    alloc_locals;
    local sbt_address;
    local admin;
    local fren;

    %{
        ids.admin = context.admin
        ids.fren = context.fren
        ids.sbt_address = context.sbt_address
    %}

    let one_as_uint256: Uint256 = Uint256(1, 0);
    let zero_as_uint256: Uint256 = Uint256(0, 0);

    let (local data: felt*) = alloc();

    // mint
    %{ stop_prank = start_prank(ids.admin, ids.sbt_address) %}
    ISBT.mint(contract_address=sbt_address, to=fren, id=one_as_uint256, value=one_as_uint256, data_len=0, data=data);
    %{ stop_prank() %}
    // check
    let (balance) = ISBT.balanceOf(sbt_address, fren, one_as_uint256);
    assert one_as_uint256 = balance;

    // burn
    %{ stop_prank = start_prank(ids.fren, ids.sbt_address) %}
    ISBT.burn(contract_address=sbt_address, from_=fren, id=one_as_uint256, value=one_as_uint256);
    %{ stop_prank() %}
    // check
    let (balance) = ISBT.balanceOf(sbt_address, fren, one_as_uint256);
    assert zero_as_uint256 = balance;

    // mint again
    %{ stop_prank = start_prank(ids.admin, ids.sbt_address) %}
    ISBT.mint(contract_address=sbt_address, to=fren, id=one_as_uint256, value=one_as_uint256, data_len=0, data=data);
    %{ stop_prank() %}
    // check
    let (balance) = ISBT.balanceOf(sbt_address, fren, one_as_uint256);
    assert one_as_uint256 = balance;

    %{
        print("burn test successful")
    %}

    // burn 
    %{ expect_revert(error_message="ERC1155: caller is not owner nor approved") %}
    %{ stop_prank = start_prank(ids.admin, ids.sbt_address) %}
    ISBT.burn(contract_address=sbt_address, from_=fren, id=one_as_uint256, value=one_as_uint256);
    %{ stop_prank() %}

    %{
        print("expect revert: don't print this")
    %}
    return();
}

@external
func test_transfer_by_user{syscall_ptr: felt*, range_check_ptr}(
) {
    alloc_locals;
    local sbt_address;
    local admin;
    local fren;

    %{
        ids.admin = context.admin
        ids.fren = context.fren
        ids.sbt_address = context.sbt_address
    %}

    let one_as_uint256: Uint256 = Uint256(1, 0);
    let zero_as_uint256: Uint256 = Uint256(0, 0);

    let (local data: felt*) = alloc();

    // mint
    %{ stop_prank = start_prank(ids.admin, ids.sbt_address) %}
    ISBT.mint(contract_address=sbt_address, to=fren, id=one_as_uint256, value=one_as_uint256, data_len=0, data=data);
    %{ stop_prank() %}

    // balanceOf
    let (balance) = ISBT.balanceOf(sbt_address, fren, one_as_uint256);
    assert one_as_uint256 = balance;

    // transfer
    %{ expect_revert(error_message="SBT, no transfer") %}
    %{ stop_prank = start_prank(ids.fren, ids.sbt_address) %}
    ISBT.safeTransferFrom(contract_address=sbt_address, from_=fren, to=admin, id=one_as_uint256, value=one_as_uint256, data_len=0, data=data);
    %{ stop_prank() %}

    %{
        print("expect revert: don't print this")
    %}
    return();
}

@external
func test_transfer_by_admin{syscall_ptr: felt*, range_check_ptr}(
) {
    alloc_locals;
    local sbt_address;
    local admin;
    local fren;

    %{
        ids.admin = context.admin
        ids.fren = context.fren
        ids.sbt_address = context.sbt_address
    %}

    let one_as_uint256: Uint256 = Uint256(1, 0);
    let zero_as_uint256: Uint256 = Uint256(0, 0);

    let (local data: felt*) = alloc();

    // mint
    %{ stop_prank = start_prank(ids.admin, ids.sbt_address) %}
    ISBT.mint(contract_address=sbt_address, to=fren, id=one_as_uint256, value=one_as_uint256, data_len=0, data=data);
    %{ stop_prank() %}

    // balanceOf
    let (balance) = ISBT.balanceOf(sbt_address, fren, one_as_uint256);
    assert one_as_uint256 = balance;

    // transfer
    %{ expect_revert(error_message="SBT, no transfer") %}
    %{ stop_prank = start_prank(ids.admin, ids.sbt_address) %}
    ISBT.safeTransferFrom(contract_address=sbt_address, from_=fren, to=admin, id=one_as_uint256, value=one_as_uint256, data_len=0, data=data);
    %{ stop_prank() %}

    %{
        print("expect revert: don't print this")
    %}
    return();
}

@external
func test_batch_transfer{syscall_ptr: felt*, range_check_ptr}(
) {
    alloc_locals;
    local sbt_address;
    local admin;
    local fren;

    %{
        ids.admin = context.admin
        ids.fren = context.fren
        ids.sbt_address = context.sbt_address
    %}

    let one_as_uint256: Uint256 = Uint256(1, 0);
    let zero_as_uint256: Uint256 = Uint256(0, 0);
    let two_as_uint256: Uint256 = Uint256(2, 0);

    let (local data: felt*) = alloc();

    let (local ids: Uint256*) = alloc();
    assert ids[0] = zero_as_uint256;
    assert ids[1] = one_as_uint256;
    assert ids[2] = two_as_uint256;

    let(local values: Uint256*) = alloc();
    assert values[0] = one_as_uint256;
    assert values[1] = one_as_uint256;
    assert values[2] = one_as_uint256;

    // mintBatch
    %{ stop_prank = start_prank(ids.admin, ids.sbt_address) %}
    ISBT.mintBatch(contract_address=sbt_address, to=fren, ids_len=3, ids=ids, values_len=3, values=values, data_len=0, data=data);
    %{ stop_prank() %}

    // batchTransfer
    %{ expect_revert(error_message="SBT, no transfer") %}
    %{ stop_prank = start_prank(ids.fren, ids.sbt_address) %}
    ISBT.safeBatchTransferFrom(contract_address=sbt_address, from_=fren, to=admin, ids_len=3, ids=ids, values_len=3, values=values, data_len=0, data=data);
    %{ stop_prank() %}

    %{
        print("expect revert: don't print this")
    %}
    return();
}