//示例01 变量与可变性

const TOTAL_SUPPLY: u32 = 1000; // 常量，必须注明类型如 u32
fn main() {
    let x = 1; //不可变变量
        x = 2; // 赋值报错 Cannot assign to an immutable variable
    let mut y = 333; //可变变量
            y = 888; //可以赋值
    
}

