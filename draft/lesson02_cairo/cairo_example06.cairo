//示例06 数组

use debug::PrintTrait;
use array::ArrayTrait; //导入数组特性

fn main(){
    let mut a = ArrayTrait::new(); // 初始化数组
    a.append(0x111); // 新增数组元素
    a.append(0x222);
    a.append(0x333);

    let num_1 = *a.get(1).unwrap().unbox(); //获取下标1的值
    let num_2 = *a.at(2); //获取下标2的值,(备注：desnap 操作符 * 可将快照转换回值)
    num_1.print(); // 0x222
    num_2.print(); // 0x333
}






