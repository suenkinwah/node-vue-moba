import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from "../views/Main"
import CategoryEdit from "../views/CategoryEdit"
import CategoryList from "../views/CategoryList";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    children:[
      {path:'/categories/create', component:CategoryEdit},
      //路由中的id指向CategoryEdit组件，也就是该路由跳转到edit页面，上下同理，props参数注入到edit页面中
      {path:'/categories/edit/:id', component:CategoryEdit, props:true},
      {path: '/categories/list', component: CategoryList},

    ]

  },



]

const router = new VueRouter({
  routes
});

export default router
