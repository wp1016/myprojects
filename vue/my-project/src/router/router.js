import App from '../App'

const Hello = r => require.ensure([], () => r(require('../components/Hello')), 'hello')

export default [{
      path: '/',
      component: App,//顶层路由
      children:[//二级路由
        //地址为空时跳转hello页面
        {
          path:'',
          redirect:'/hello'
        },
        {
          path:'/hello',
          component:Hello
        }
      ]
}]
