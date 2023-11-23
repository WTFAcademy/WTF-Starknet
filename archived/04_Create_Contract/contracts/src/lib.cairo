// Defining an explicit interface
#[starknet::interface]
trait IExplicitCreateContract<TContractState> {
    fn set_increment(ref self: TContractState, value: u8);
}

#[starknet::contract]
mod create_contract {
    #[storage]
    // Storage must be annoted by the #[storage] attribute
    struct Storage {
        // Define storage variables 
        increment: u8,
    }

    #[constructor]
    // Constructor must be annotated by the #[constructor] attribute
    // As an input variable, we reference the state of the contract
    fn constructor(ref self: ContractState) {
        self.increment.write(0);
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    // Events must be annoted by the #[event] attribute
    // In addition we need to derive the Drop and starknet::Event traits
    // Inside the Event enum, we define all created events
    enum Event {
        CounterIncreased: CounterIncreased,
    }

    #[derive(Drop, starknet::Event)]
    // Deriving the starknet::Event indicates that this struct will be emiting events
    struct CounterIncreased {
        amount: u8,
    }


    // Private Functions that doesn't have the #[external(v0)] attribute
    #[generate_trait]
    impl InternalFunctions of InternalFunctionsTrait {
        fn reset_increment(ref self: ContractState) {
            self.increment.write(0);
        }
    }

    // Public Functions are defined with the #[external(v0)] attribute
    // #[generate_trait] will implicitly generate our interface.
    #[external(v0)]
    #[generate_trait]
    impl CreateContract of ICreateContract {
        // Read-only function
        // @ContractState indicates that we pass a snapshot of the ContractState
        fn get_increment(self: @ContractState) -> u8 {
            self.increment.read()
        }

        // Read/Write function
        // ref self: ContractState indicates that we pass the reference of the ContractState
        fn increase_increment(ref self: ContractState) {
            let current_increment = self.increment.read();

            if current_increment == 64 {
                // calling an internal function
                self.reset_increment();
            } else {
                self.increment.write(current_increment + 1);
            }

            // emiting an event
            self.emit(Event::CounterIncreased(CounterIncreased { amount: self.increment.read() }));
        }
    }

    // Public Function with an explicitly defined interface
    #[external(v0)]
    impl ExplicitCreateContract of super::IExplicitCreateContract<ContractState> {
        fn set_increment(ref self: ContractState, value: u8) {
            self.increment.write(value);
        }
    }
}
