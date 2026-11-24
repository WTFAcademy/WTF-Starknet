#[starknet::interface]
trait IWTFMint<TContractState> {
    fn mint(ref self: TContractState);
}

#[starknet::contract]
mod WTF {
    use openzeppelin_introspection::src5::SRC5Component;
    use openzeppelin_token::erc721::{
        ERC721Component, ERC721HooksEmptyImpl, ERC721OwnerOfDefaultImpl, ERC721TokenURIDefaultImpl,
    };
    use starknet::get_caller_address;
    use starknet::storage::{StoragePointerReadAccess, StoragePointerWriteAccess};

    #[abi(embed_v0)]
    impl ERC721MixinImpl = ERC721Component::ERC721MixinImpl<ContractState>;

    impl ERC721InternalImpl = ERC721Component::InternalImpl<ContractState>;

    component!(path: SRC5Component, storage: src5, event: SRC5Event);
    component!(path: ERC721Component, storage: erc721, event: ERC721Event);

    #[storage]
    struct Storage {
        #[substorage(v0)]
        erc721: ERC721Component::Storage,
        #[substorage(v0)]
        src5: SRC5Component::Storage,
        nextTokenId: u256,
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        SRC5Event: SRC5Component::Event,
        #[flat]
        ERC721Event: ERC721Component::Event, 
    }


    #[constructor]
    fn constructor(ref self: ContractState, name: ByteArray, symbol: ByteArray) {
        self.erc721.initializer(name, symbol, "");
    }

    #[abi(embed_v0)]
    impl IWTFMintImpl of super::IWTFMint<ContractState> {
        fn mint(ref self: ContractState) {
            let nextTokenId = self.nextTokenId.read();
            self.erc721.mint(get_caller_address(), nextTokenId);
            self.nextTokenId.write(nextTokenId + 1);
        }
    }
}
