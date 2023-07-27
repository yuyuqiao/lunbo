
import axios , { AxiosResponse} from 'axios' 
import {Message} from '@arco-design/web-vue'
import router from '@/router'
import store from '@/store'
//1. 创建axios对象
const requests = axios.create(
  { 
    // 设置超时请求
    // timeout: 10000
  }
);


//2. 请求拦截器
requests.interceptors.request.use(config => {
  // 可以在此加入token
  // config.headers.Authorization =  store.state.user.userinfor.token || ''
  return config;
}, error => {
  Promise.reject(error);
});
 

//3. 响应拦截器
requests.interceptors.response.use((response: AxiosResponse<any>) => {
  // let responses = JSON.parse(response.data)
  // 下载模板设置
  if (response.config['responseType'] == 'blob') {
    return response
  }
  //判断code码
  // console.log(response.data,'response',JSON.parse(response.data))
  if(response.data.code == 0)
  return response.data;
  if(response.data.code == '-2'||response.data.code == -2) {
    // token 无效
    store.commit('user/setUser', {token: ''})
    sessionStorage.clear()
    router.push('/login')
    Message.error(response.data.msg)
  }else  if(response.data.code == '-3'||response.data.code == -3)
  //  权限不足
    router.push('/no_permissions')
  else return Message.error(response.data.msg)
},error => {
  // console.log(error)
  Message.error('请求失败，请联系开发管理员！！！')
  return Promise.reject(error);
});

export default requests;