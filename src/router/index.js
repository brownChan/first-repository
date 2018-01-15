import Login from "../component/login/Login.vue";
import Register from "../component/register/Register.vue";
import Admin from "../component/admin/Admin.vue";
//引入商品分类
import GoodsCgList from "../component/admin/goods/category/list.vue";
import GoodsCgEdit from "../component/admin/goods/category/edit.vue";
//引入商品内容
import GoodsCtList from "../component/admin/goods/content/list.vue";
import GoodsCtEdit from "../component/admin/goods/content/edit.vue";

let adminGoods = [
  //商品分类
  { name: "goodsCgList", path: "goods/category/list", component: GoodsCgList },
  { name: "goodsCgEdit", path: "goods/category/edit/:id", component: GoodsCgEdit },
  { name: "goodsCgAdd", path: "goods/category/add", component: GoodsCgEdit },
  //商品内容
  { name: "goodsCtList", path: "goods/content/list", component: GoodsCtList },
  { name: "goodsCtEdit", path: "goods/content/edit/:id", component: GoodsCtEdit },
  { name: "goodsCtAdd", path: "goods/content/add", component: GoodsCtEdit }
]
//该文件对外导出路由配置
export default {
  routes: [
    //登陆
    {name:"login",path:"/login",component:Login},
    //register
    { name: "register", path: "/register", component: Register},
    //后台管理
    {name:"admin",path:"/admin",component:Admin, children: adminGoods},
    //重定向redirect
    {path:"/", redirect: "/admin"},
  ]
}