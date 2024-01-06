//示例08 结构体的定义及实例化

//定义一种结构体
#[derive(Copy, Drop)]
struct PlayerStruct {
    id: u64,
    name: felt252,
    level: u64,
}

fn main(){
    // 实例化结构体
    let player_1 = PlayerStruct{
            id:9527,
            name:'HA',
            level:1 
        };
}






