//示例10 枚举和模式匹配

use array::ArrayTrait; //导入数组特性

// 定义一个枚举类型
enum Direction {
    Left,
    Right,
    Stay,
}

fn main(){
    let mut position = 100;
    // 创建枚举类型的变量
    let move = Direction::Left;
    // 使用 match 表达式对 move 进行模式匹配
    match move {
        Direction::Left  => position + 1, // 分支1
        Direction::Right => position - 1, // 分支2
        Direction::Stay  => position + 0, // 分支3
    };
}









