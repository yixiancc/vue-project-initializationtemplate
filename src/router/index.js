import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "index",
        component: () => import('@/views/index.vue'),
        meta: {
            title: ""
        }
    },
    {
        path: '/404',
        component: () => import('@/views/404.vue')
    },
    // 404 page must be placed at the end !!!
    {path: '*', redirect: '/404'}
];

const router = new VueRouter({
    mode: "history",
    base: import.meta.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    next();
});

export default router;
