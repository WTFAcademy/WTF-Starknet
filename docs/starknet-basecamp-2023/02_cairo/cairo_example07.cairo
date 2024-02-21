//示例07 字典

use dict::Felt252DictTrait; // 导入字典特性

fn main(){
    let mut menu = felt252_dict_new::<felt252>();
    menu.insert('fish', 1024);       // 写入键对应的值
    let price_1 = menu['fish'];      // 方式1 读取键值，1024
    let price_2 = menu.get('meat');  // 方式2 读取键值，初始值为 0
}






