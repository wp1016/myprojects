import App from '@/App'

const hello = r => require.ensure([], () => r(require('@/components/Hello')), 'hello');


export default[
    {
      path: '/',
      component: App,
      children:[
        {
          path:'',
          redirect:'/hello'
        },
        {
          path:'/hello',
          component:hello
        }
      ]
    }
]
