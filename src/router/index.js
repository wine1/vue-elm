import App from '../App'
// webpack中利用require.ensure()实现按需加载
const home = r=> require.ensure([],()=>r(require('../pages/home')),'home')


export default({
  path:'/',
  component:App,
  children:[{
    path:'',
    redirect:'/home'
  }]

  
})
 