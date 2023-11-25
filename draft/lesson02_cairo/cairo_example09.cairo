//示例09 结构体的方法

//定义一种结构体
#[derive(Copy, Drop)]
struct PlayerStruct {
    id: u64,
    name: felt252,
    level: u64,
}
//在结构体的 trait 里，定义函数签名
trait PlayerTrait { // 函数参数:该结构体快照
    fn attack(self: @PlayerStruct) -> u64;
}

//在 trait 的 impl 里，完善函数体
impl PlayerImpl of PlayerTrait {
    fn attack(self: @PlayerStruct) -> u64 {
        (*self.level) * (0x100)
    }
}

fn main(){
    // 实例化结构体
    let player_1 = PlayerStruct{
            id:9527,
            name:'HA',
            level:5 
        };
    //获取结构体的字段的值
    let name = player_1.name;
    // 调用结构体方法，返回 0x500
    let attack_point = player_1.attack(); 
}






