fn sum(a: felt252, b:felt252) -> felt252{
    a + b
}

#[test]
fn test_fuzz_sum(x: felt252, y: felt252) {
    assert(sum(x, y) == x + y, 'sum is not correct');
}