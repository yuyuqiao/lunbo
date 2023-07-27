
export interface UserState {
  userinfor?: Object;
  avatar?: string;
  token?: string;
}
export default {
  namespaced: true,
  state: (): UserState => ({
    // 用户信息
    userinfor: {
      token: undefined
    },
    avatar: undefined,
    token: undefined
  }),
  // state () {
  //   return {
  //     // 用户信息
  //     userinfor: {
  //       token:''
  //     }
  //   }
  // },
  mutations: {
    // 修改用户信息
    setUser(state: any, payload: any) {
      state.userinfor = payload;
    }
  }
}
