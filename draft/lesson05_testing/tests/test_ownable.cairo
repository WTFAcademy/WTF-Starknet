use starknet::{ContractAddress};
use starknet::syscalls::deploy_syscall;
use result::ResultTrait;
use array::{ArrayTrait, SpanTrait};
use traits::TryInto; 
use option::OptionTrait;

use snforge_std::{declare, ContractClassTrait};
use snforge_std::fs::{ FileTrait, read_txt};
use snforge_std::{start_prank,stop_prank, CheatTarget};
use snforge_std::{start_mock_call, stop_mock_call};

use demo::{OwnableTraitDispatcher, OwnableTraitDispatcherTrait};
use demo::{IDataSafeDispatcher, IDataSafeDispatcherTrait};

mod Errors{
    const INVALID_OWNER: felt252 = 'Caller is not the owner';
    const INVALID_DATA: felt252 = 'INVALID_DATA';
}

mod Accounts{
    use starknet::{ContractAddress};
    use traits::TryInto;
    
    fn admin() -> ContractAddress{
        'admin'.try_into().unwrap()
    }
    fn bad_guy() -> ContractAddress{ 
        'bad_guy'.try_into().unwrap()
    }
    fn new_admin() -> ContractAddress{
        'new_admin'.try_into().unwrap()
    }

}


fn deploy_contract(name: felt252) -> ContractAddress{

    let account: ContractAddress = Accounts::admin();
    let contract = declare(name);
    // calldata
    // let mut calldata = array![account.into()];
    
    let file = FileTrait::new('data/calldata.txt');
    let calldata = read_txt(@file);
    // deploy contract


    contract.deploy(@calldata).unwrap()
}


#[test]
fn test_construct_with_admin(){
    let contract_address = deploy_contract('ownable');

    let dispatcher = OwnableTraitDispatcher {contract_address};

    let owner = dispatcher.owner();

    assert(Accounts::admin() == owner, Errors::INVALID_OWNER);
}

#[test]
fn test_transfer_ownership_admin(){
    let contract_address = deploy_contract('ownable');

    let dispatcher = OwnableTraitDispatcher {contract_address};

    start_prank(CheatTarget::One(contract_address), Accounts::admin());

    dispatcher.transfer_ownership(Accounts::new_admin());

    assert(dispatcher.owner() == Accounts::new_admin(), Errors::INVALID_OWNER);

    stop_prank(CheatTarget::One(contract_address));
}

#[test]
#[should_panic(expected : ('INVALID_OWNER', ))]
fn test_transfer_ownership_bad(){
    let contract_address = deploy_contract('ownable');

    let dispatcher = OwnableTraitDispatcher {contract_address};

    start_prank(CheatTarget::One(contract_address), Accounts::bad_guy());

    dispatcher.transfer_ownership(Accounts::bad_guy());

    assert(dispatcher.owner() == Accounts::new_admin(), Errors::INVALID_OWNER);

    stop_prank(CheatTarget::One(contract_address));
}

#[test]
fn test_data_start_mock_call_get_data(){
    
    let contract_address = deploy_contract('ownable');
    
    let safe_dispatcher = IDataSafeDispatcher {contract_address};

    let mock_ret_data = 100;

    start_mock_call(contract_address, 'get_data', mock_ret_data);

    start_prank(CheatTarget::One(contract_address), Accounts::admin());

    safe_dispatcher.set_data(20);

    let data = safe_dispatcher.get_data().unwrap();

    assert(data == mock_ret_data, Errors::INVALID_DATA);

    stop_mock_call(contract_address, 'get_data');

    let data1 = safe_dispatcher.get_data().unwrap();

    assert(data1 == 20, Errors::INVALID_DATA);

    stop_prank(CheatTarget::One(contract_address));
}
