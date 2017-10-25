import App from '@/App'
import Hello from '@/components/Hello'


export default [
  {
    path:'/',
    component:App,
    children:[
      {
        path: '',
        name: 'Hello',
        component: Hello
      }
    ]
  }
]
