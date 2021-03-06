// eslint-disable-next-line
import { UserLayout, BasicLayout, BlankLayout } from '@/layouts'
// import { bxAnaalyse } from '@/core/icons'

const RouteView = {
  name: 'RouteView',
  render: h => h('router-view')
}

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: 'menu.home' },
    redirect: '/account',
    children: [
      // list
      // {
      //   path: '/list',
      //   name: 'list',
      //   component: RouteView,
      //   redirect: '/list/table-list',
      //   meta: { title: 'menu.list', icon: 'table', permission: ['table'] },
      //   children: [
      //     {
      //       path: '/list/table-list/:pageNo([1-9]\\d*)?',
      //       name: 'TableListWrapper',
      //       hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
      //       component: () => import('@/views/list/TableList'),
      //       meta: { title: 'menu.list.table-list', keepAlive: true, permission: ['table'] }
      //     },
      //     {
      //       path: '/list/basic-list',
      //       name: 'BasicList',
      //       component: () => import('@/views/list/BasicList'),
      //       meta: { title: 'menu.list.basic-list', keepAlive: true, permission: ['table'] }
      //     },
      //     {
      //       path: '/list/card',
      //       name: 'CardList',
      //       component: () => import('@/views/list/CardList'),
      //       meta: { title: 'menu.list.card-list', keepAlive: true, permission: ['table'] }
      //     },
      //     {
      //       path: '/list/search',
      //       name: 'SearchList',
      //       component: () => import('@/views/list/search/SearchLayout'),
      //       redirect: '/list/search/article',
      //       meta: { title: 'menu.list.search-list', keepAlive: true, permission: ['table'] },
      //       children: [
      //         {
      //           path: '/list/search/article',
      //           name: 'SearchArticles',
      //           component: () => import('../views/list/search/Article'),
      //           meta: { title: 'menu.list.search-list.articles', permission: ['table'] }
      //         },
      //         {
      //           path: '/list/search/project',
      //           name: 'SearchProjects',
      //           component: () => import('../views/list/search/Projects'),
      //           meta: { title: 'menu.list.search-list.projects', permission: ['table'] }
      //         },
      //         {
      //           path: '/list/search/application',
      //           name: 'SearchApplications',
      //           component: () => import('../views/list/search/Applications'),
      //           meta: { title: 'menu.list.search-list.applications', permission: ['table'] }
      //         }
      //       ]
      //     }
      //   ]
      // },

      // Exception
      // {
      //   path: '/exception',
      //   name: 'exception',
      //   component: RouteView,
      //   redirect: '/exception/403',
      //   meta: { title: 'menu.exception', icon: 'warning', permission: ['exception'] },
      //   children: [
      //     {
      //       path: '/exception/403',
      //       name: 'Exception403',
      //       component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/403'),
      //       meta: { title: 'menu.exception.not-permission', permission: ['exception'] }
      //     },
      //     {
      //       path: '/exception/404',
      //       name: 'Exception404',
      //       component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
      //       meta: { title: 'menu.exception.not-find', permission: ['exception'] }
      //     },
      //     {
      //       path: '/exception/500',
      //       name: 'Exception500',
      //       component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/500'),
      //       meta: { title: 'menu.exception.server-error', permission: ['exception'] }
      //     }
      //   ]
      // },
      // 账号管理
      {
        path: '/account',
        component: () => import('@/views/account/index.vue'),
        name: 'account',
        meta: { title: 'menu.account', icon: 'user', keepAlive: true, permission: ['user'] }
      },

      // 超市简介
      {
        path: '/supermarket',
        component: () => import('@/views/supermarket/index.vue'),
        name: 'supermarket',
        meta: { title: 'menu.supermarket', icon: 'shop', keepAlive: true, permission: ['user'] }
      },

      // 资料管理
      {
        path: '/datum',
        component: () => import('@/views/datum/index.vue'),
        name: 'datum',
        meta: { title: 'menu.datum', icon: 'profile', keepAlive: true, permission: ['user'] }
      },
      // 咨询维护
      {
        path: '/information',
        component: () => import('@/views/information/index.vue'),
        name: 'information',
        meta: { title: 'menu.information', icon: 'file-protect', keepAlive: true, permission: ['user'] }
      },
      // 平台满意
      {
        path: '/platform',
        component: () => import('@/views/platform/index.vue'),
        name: 'platform',
        meta: { title: 'menu.platform', icon: 'smile', keepAlive: true, permission: ['user'] }
      },
      // 统计分析
      {
        path: '/analyse',
        component: () => import('@/views/analyse/index.vue'),
        name: 'analyse',
        meta: { title: 'menu.analyse', icon: 'pie-chart', keepAlive: true, permission: ['user'] }
      },
      // 系统管理
      {
        path: '/system',
        component: RouteView,
        name: 'system',
        meta: {
          title: 'menu.system', icon: 'setting', keepAlive: true, permission: ['user']
        },
        children: [
          {
            path: '/system/user',
            name: 'user',
            component: () => import('@/views/system/user/index.vue'),
            meta: { title: 'menu.system.user', keepAlive: true, permission: ['user'] }
          },
          {
            path: '/system/role',
            name: 'role',
            component: () => import('@/views/system/role/index.vue'),
            meta: { title: 'menu.system.role', keepAlive: true, permission: ['user'] }
          },
          {
            path: '/system/organize',
            name: 'organize',
            component: () => import('@/views/system/organize/index.vue'),
            meta: { title: 'menu.system.organize', keepAlive: true, permission: ['user'] }
          },
          {
            path: '/system/menu',
            name: 'menu',
            component: () => import('@/views/system/menu/index.vue'),
            meta: { title: 'menu.system.menu', keepAlive: true, permission: ['user'] }
          }
        ]
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }
]
