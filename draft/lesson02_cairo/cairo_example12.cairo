//示例12 快照

use array::ArrayTrait; //导入数组特性
// “ @ ” 表明函数接收的数据类型为 “ 快照 ”
fn read_0(arr: @Array<u64>) { arr.get(0); }
fn read_1(arr: @Array<u64>) { arr.get(1); }

fn main(){
    // 创建 数组_1。此时其所有权属于 main()
    let mut arr_1 = ArrayTrait::<u64>::new();
    arr_1.append(111);
    arr_1.append(222);

    read_0(@arr_1); //正常执行。 “ @ ” 表明传入的数据类型为“ 快照 ”
    read_1(@arr_1); //正常执行。因为 传给 read_0(）的只是 “复印件”
                    // 数组_1 的 “原件” 还保留在 main() 函数里。
}









