//示例11 所有权

use array::ArrayTrait; //导入数组特性

fn read_0(arr: Array<u64>) { arr.get(0); }
fn read_1(arr: Array<u64>) { arr.get(1); }

fn main(){
    // 创建 数组_1。此时其所有权属于 main()
    let mut arr_1 = ArrayTrait::<u64>::new();
    arr_1.append(111);
    arr_1.append(222);

    read_0(arr_1); //正常执行。此后 数组_1 的所有权将转移给 read_0(）
    read_1(arr_1); //无法执行。因为 main() 已失去 数组_1 的所有权  
}









