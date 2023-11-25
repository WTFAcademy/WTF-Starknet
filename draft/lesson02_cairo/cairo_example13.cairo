//示例13 引用

use debug::PrintTrait;
use array::ArrayTrait; //导入数组特性
// “ ref ” 表明函数接收的数据类型为 “ 引用 ”
fn increase(ref arr: Array<u64>) { arr.append(0x333); }
fn decrease(ref arr: Array<u64>) { arr.pop_front();   }

fn main(){
    // 创建 数组_1。此时其所有权属于 main()
    //只有使用 mut 声明变量为可变，才能使用 ref 修饰符。
    let mut arr_1 = ArrayTrait::<u64>::new();
    arr_1.append(0x111);
    arr_1.append(0x222);

    increase(ref arr_1); //正常执行。 “ ref ” 表明传入的数据类型为“ 引用 ”
    decrease(ref arr_1); //正常执行。传给 read_0(）执行后，所有权又返还了。
    arr_1.len().print(); //正常执行。
}









