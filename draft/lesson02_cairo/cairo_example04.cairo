//示例04 控制流 if

use debug::PrintTrait;

fn main() {
    let a :u64 = 10;
    let b :u64 = 10;

    if a > b {
        'Big'.print();
    }else if a < b { // 用 else if 处理多个条件
        'Less'.print();
    }else{
        'equal'.print();
    }
}





