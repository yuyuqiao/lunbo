export default {
    /**
    * 定义命名空间，防止多个模块同名共享，使用时需要带上命名空间
    */
        namespaced: true,
        state: {
            _axiosPromiseArr:[],
        },
        mutations: {
            add_AxiosPromiseArr(state:any, item:any) {
                console.log("添加_axiosPromiseArr");
                state._axiosPromiseArr.push(item)
            },
            clear_AxiosPromiseArr(state:any) {
                console.log("_axiosPromiseArr情空");
                state._axiosPromiseArr = []
            },
        },
    }
    