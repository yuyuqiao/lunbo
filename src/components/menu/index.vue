
<script lang="tsx">
import { defineComponent, ref, h, compile, computed, reactive } from 'vue';
import { listenerRouteChange } from '@/utils/route-listener';
import { useRoute, useRouter, RouteRecordRaw } from 'vue-router';
export default defineComponent({
    setup() {
        let routerList = reactive<any>({
            menuTree: [
                {
                    path: '/dashboard', name: 'dashboard', meta: {
                        title: '仪表盘',
                        locale: 'menu.dashboard',
                        requiresAuth: false,
                        icon: 'icon-dashboard',
                        order: 0,
                    },
                    children: [
                        {
                            path: 'workplace',
                            name: 'Workplace',
                            meta: {
                                title: '工作台',
                                requiresAuth: false,
                            },
                        },

                        {
                            path: 'monitor',
                            name: 'Monitor',
                            meta: {
                                title: "公告列表",
                                requiresAuth: true,
                            },
                        },
                    ],
                },
                {
                    path: '/video',
                    name: 'video',
                    meta: {
                        title: '学习视频',
                        requiresAuth: false,
                        icon: 'icon-video-camera',
                        order: 1,
                    },
                    children: [
                        {
                            path: 'change-shift',
                            name: 'changeshift',
                            meta: {
                                title: '交接班',
                                requiresAuth: false,
                            },
                        },
                        {
                            path: 'business',
                            name: 'business',
                            meta: {
                                title: '营业中',
                                requiresAuth: false,
                            },
                        },
                        {
                            path: 'close',
                            name: 'close',
                            meta: {
                                title: '打烊',
                                requiresAuth: false,
                            },
                        }
                    ],
                },
                {
                    path: '/perofrmance',
                    name: 'perofrmance',
                    meta: {
                        title: '业绩看板',
                        requiresAuth: true,
                        icon: 'icon-bar-chart',
                        order: 2,
                    },
                    children: [
                        {
                            path: 'store-board',
                            name: 'storeboard',
                            meta: {
                                title: '门店看板',
                                requiresAuth: false,
                            },
                        },
                        {
                            path: 'store-mask-board',
                            name: 'storeMaskBoard',
                            meta: {
                                title: '门店经营状况',
                                requiresAuth: true,
                            },
                        }
                    ],
                }
            ]
        })
        const collapsed = computed({
            get() {
                return false;
            },
            set(value: boolean) {
                console.log(value)
            },
        });
        const router = useRouter()
        const openKeys = ref<string[]>([]);
        const selectedKey = ref();
        //    路由跳转
        const goto = (item: RouteRecordRaw) => {
            router.push({
                name: item.name,
            });
        };
        // 返回选定的组 值
        const findMenuOpenKeys = (target: string) => {
            const result: string[] = [];
            let isFind = false;
            const backtrack = (item: RouteRecordRaw, keys: string[]) => {
                if (item.name === target) {
                    isFind = true;
                    result.push(...keys);
                    return;
                }
                if (item.children?.length) {
                    item.children.forEach((el) => {
                        backtrack(el, [...keys, el.name as string]);
                    });
                }
            };
            routerList.menuTree.forEach((el: RouteRecordRaw) => {
                if (isFind) return;
                backtrack(el, [el.name as string]);
            });
            return result;
        };
        // 获取派发事件的值
        listenerRouteChange((newRoute) => {
            const { requiresAuth, activeMenu, hideInMenu } = newRoute.meta;
            if (requiresAuth && (!hideInMenu || activeMenu)) {
                const menuOpenKeys = findMenuOpenKeys(
                    (activeMenu || newRoute.name) as string
                );

                const keySet = new Set([...menuOpenKeys, ...openKeys.value]);
                openKeys.value = [...keySet];

                // 选定的路由
                selectedKey.value = [
                    activeMenu || menuOpenKeys[menuOpenKeys.length - 1],
                ];
            }
        }, true);
        const setCollapse = (val: boolean) => {
            // if (appStore.device === 'desktop')
            //     appStore.updateSettings({ menuCollapse: val });
        };
        //   
        const renderSubMenu = () => {
            function travel(_route: RouteRecordRaw[], nodes = []) {
                if (_route) {
                    _route.forEach((element) => {
                        if (!element?.meta?.requiresAuth) return
                        const icon = element?.meta?.icon
                            ? () => h(compile(`<${element?.meta?.icon}/>`))
                            : null;
                        const node =
                            element?.children && element?.children.length !== 0 ? (
                                <a-sub-menu
                                    key={element?.name}
                                    v-slots={{
                                        icon,
                                        title: () => element?.meta?.title || '',
                                    }}
                                >
                                    {travel(element?.children)}
                                </a-sub-menu>
                            ) : (
                                <a-menu-item
                                    key={element?.name}
                                    v-slots={{ icon }}
                                    onClick={() => goto(element)}
                                >
                                    {element?.meta?.title || ''}
                                </a-menu-item>
                            );
                        nodes.push(node as never);
                    });
                }
                return nodes;
            }
            return travel(routerList.menuTree)
        };
        return () => (
            <a-menu
                v-model:collapsed={collapsed.value}
                v-model:open-keys={openKeys.value}

                auto-open={false}
                selected-keys={selectedKey.value}
                auto-open-selected={true}
                level-indent={34}
                style="height: 100%;width:100%;"
                onCollapse={setCollapse}
            >
                {renderSubMenu()}
            </a-menu>
        );
    },
});
</script>