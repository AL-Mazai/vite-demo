import { createRouter, createWebHistory } from 'vue-router'

const routerHistory = createWebHistory()
const router = createRouter({
    history: routerHistory,
    routes: [
        {
            path: '/',
            name:'HelloWord',
            component: () => import("../components/HelloWorld.vue")
        },
        {
            path: '/Other',
            name: 'Other',
            component: () => import("../components/Other.vue")
        },
    ]
})
export default router
