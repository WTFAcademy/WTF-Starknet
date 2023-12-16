#[starknet::interface]
trait IWTFMint<TContractState> {
    fn mint(ref self: TContractState);
}

#[starknet::contract]
mod WTF {
    use starknet::{ ContractAddress, get_caller_address };
    use openzeppelin::token::erc721::erc721::ERC721Component::InternalTrait;
    use openzeppelin::token::erc721::ERC721Component;
    use openzeppelin::introspection::src5::SRC5Component;
    #[abi(embed_v0)]
    impl ERC721Impl = ERC721Component::ERC721Impl<ContractState>;
    #[abi(embed_v0)]
    impl ERC721CamelOnlyImpl = ERC721Component::ERC721CamelOnlyImpl<ContractState>;
    #[abi(embed_v0)]
    impl ERC721MetadataCamelOnlyImpl = ERC721Component::ERC721MetadataCamelOnlyImpl<ContractState>;

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
    fn constructor(ref self: ContractState, name: felt252, symbol: felt252) {
        self.erc721.initializer(name, symbol);
    }

    #[external(v0)]
    impl IWTFMintImpl of super::IWTFMint<ContractState> {
        fn mint(ref self: ContractState) {
            let mut nextTokenId = self.nextTokenId.read();
            self.erc721._mint(get_caller_address(), nextTokenId);
            self.nextTokenId.write(nextTokenId + 1);
        }
    }
}