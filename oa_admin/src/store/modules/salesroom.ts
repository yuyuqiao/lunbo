export default {
    state: {
        // 片区门店联动
        sales: []
    },
    mutations: {
        SET_SALES(context: any) {
            context.sales = context
        }
    },
    actions: {
        SET_SALES_ASYNS(context: any) {
            context.commit('SET_SALES')
        }
    }
}