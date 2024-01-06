//use array::ArrayTrait;
//use option::OptionTrait;
//use box::BoxTrait;
//use poseidon::poseidon_hash_span;
use starknet::ContractAddress;



// Cairo 目前只有 loop 一种循环：
fn main() {
    let mut counter = 0;
    loop {
        counter += 1;  // 想要循环执行的代码

        if counter == 10{ // 终止执行的条件
        break (); // 终止循环的语句
        }
    };
}





