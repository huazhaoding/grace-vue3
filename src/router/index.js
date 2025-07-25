import { createWebHistory, createRouter } from 'vue-router'
/* Layout */
import Layout from '@/layout'

/**
 * Note: 路由配置项
 *
 * hidden: true                     // 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * alwaysShow: true                 // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *                                  // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 *                                  // 若你想不管路由下面的 children 声明的个数都显示你的根路由
 *                                  // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * redirect: noRedirect             // 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'               // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * query: '{"id": 1, "name": "ry"}' // 访问路由的默认传递参数
 * roles: ['admin', 'common']       // 访问路由的角色权限
 * permissions: ['a:a:a', 'b:b:b']  // 访问路由的菜单权限
 * meta : {
    noCache: true                   // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    title: 'title'                  // 设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'                // 设置该路由的图标，对应路径src/assets/icons/svg
    breadcrumb: false               // 如果设置为false，则不会在breadcrumb面包屑中显示
    activeMenu: '/system/user'      // 当路由设置了该属性，则会高亮相对应的侧边栏。
  }
 */

// 公共路由
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login'),
    meta: { title: '登录'},
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/register'),
    meta: { title: '注册'},
    hidden: true
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import('@/views/error/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: '/index',
        component: () => import('@/views/index'),
        name: 'Index',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'profile/:activeTab?',
        component: () => import('@/views/system/user/profile/index'),
        name: 'Profile',
        meta: { title: '个人中心', icon: 'user' }
      }
    ]
  }
]

// 动态路由，基于用户权限动态去加载
export const dynamicRoutes = [
  {
    path: '/system/user-auth',
    component: Layout,
    hidden: true,
    permissions: ['system:user:edit'],
    children: [
      {
        path: 'role/:userId(\\d+)',
        component: () => import('@/views/system/user/authRole'),
        name: 'AuthRole',
        meta: { title: '分配角色', activeMenu: '/system/user' }
      }
    ]
  },
  {
    path: '/system/role-auth',
    component: Layout,
    hidden: true,
    permissions: ['system:role:edit'],
    children: [
      {
        path: 'user/:roleId(\\d+)',
        component: () => import('@/views/system/role/authUser'),
        name: 'AuthUser',
        meta: { title: '分配用户', activeMenu: '/system/role' }
      }
    ]
  },
  {
    path: '/system/dict-data',
    component: Layout,
    hidden: true,
    permissions: ['system:dict:list'],
    children: [
      {
        path: 'index/:dictId(\\d+)',
        component: () => import('@/views/system/dict/data'),
        name: 'Data',
        meta: { title: '字典数据', activeMenu: '/system/dict' }
      }
    ]
  },
  {
    path: '/monitor/job-log',
    component: Layout,
    hidden: true,
    permissions: ['monitor:job:list'],
    children: [
      {
        path: 'index/:jobId(\\d+)',
        component: () => import('@/views/monitor/job/log'),
        name: 'JobLog',
        meta: { title: '调度日志', activeMenu: '/monitor/job' }
      }
    ]
  },
  {
    path: '/server/mail/handle',
    component: Layout,
    hidden: true,
    permissions: ['server:mail:add'],
    children: [
      {
        path: 'add',
        component: () => import('@/views/server/mail/add/index'),
        name: '"AddMail',
        meta: { title: '添加邮件', activeMenu: '/server/mail' }
      },
    ]
  },
  {
    path: '/server/mail/handle',
    component: Layout,
    hidden: true,
    permissions: ['server:mail:update'],
    children: [
      {
        path: 'update/:mailId(\\d+)',
        component: () => import('@/views/server/mail/update/index'),
        name: 'UpdateMail',
        meta: { title: '修改邮件', activeMenu: '/server/mail' }
      }
    ]
  },
  {
    path: '/server/mail/handle',
    component: Layout,
    hidden: true,
    permissions: ['server:mail:view'],
    children: [
      {
        path: 'view/:mailId(\\d+)',
        component: () => import('@/views/server/mail/update/index'),
        name: 'ViewMail',
        meta: { title: '查看邮件', activeMenu: '/server/mail' }
      }
    ]
  },
  {
    path: '/tool/gen-edit',
    component: Layout,
    hidden: true,
    permissions: ['tool:gen:edit'],
    children: [
      {
        path: 'index/:tableId(\\d+)',
        component: () => import('@/views/tool/gen/editTable'),
        name: 'GenEdit',
        meta: { title: '修改生成配置', activeMenu: '/tool/gen' }
      }
    ]
  },
  {
    path: '/cms/article/edit',
    component: Layout,
    hidden: true,
    permissions: ['cms:article:add'],
    children: [
      {
        path: ':editType(\\w+)',
        component: () => import('@/views/cms/article/add/index'),
        name: 'AddArticle',
        meta: { title: '添加文章', activeMenu: '/cms/article' }
      },
    ]
  },
  {
    path: '/cms/article/edit',
    component: Layout,
    hidden: true,
    permissions: ['cms:article:edit'],
    children: [
      {
        path: ':editType(\\w+)/:articleId(\\d+)',
        component: () => import('@/views/cms/article/update/index'),
        name: 'UpdateArticle',
        meta: { title: '修改文章', activeMenu: '/cms/article' }
      }
    ]
  },
  {
    path: '/cms/web/theme',
    component: Layout,
    hidden: true,
    permissions: ['cms:web:view'],
    children: [
      {
        path: ':webName(\\w+)',
        component: () => import('@/views/cms/web/theme/index'),
        name: 'Theme',
        meta: { title: '主题列表', activeMenu: '/cms/web' }
      }
    ]
  },
  {
    path: '/cms/web/theme/themeSetting',
    component: Layout,
    hidden: true,
    permissions: ['cms:theme:setting'],
    children: [
      {
        path: ':webName(\\w+)/:themeName(\\w+)',
        component: () => import('@/views/cms/web/theme/themeSetting'),
        name: 'ThemeSetting',
        meta: { title: '主题配置', activeMenu: '/cms/web/theme' }
      }
    ]
  },
  {
    path: '/cms/web/theme/themeConfig',
    component: Layout,
    hidden: true,
    permissions: ['cms:theme:config'],
    children: [
      {
        path: ':webName(\\w+)/:themeName(\\w+)',
        component: () => import('@/views/cms/web/theme/themeConfig'),
        name: 'ThemeConfig',
        meta: { title: '网站配置', activeMenu: '/cms/web/theme' }
      }
    ]
  },
  {
    path: '/cms/web/theme/themeEdit',
    component: Layout,
    hidden: true,
    permissions: ['cms:theme:edit'],
    children: [
      {
        path: ':webName(\\w+)',
        component: () => import('@/views/cms/web/theme/themeEdit'),
        name: 'ThemeEdit',
        meta: { title: '主题编辑', activeMenu: '/cms/web/theme' }
      }
    ]
  },
  {
    path: '/cms/web/theme/category',
    component: Layout,
    hidden: true,
    permissions: ['theme:category:config'],
    children: [
      {
        path: ':webName(\\w+)/:themeName(\\w+)',
        component: () => import('@/views/cms/web/category/index'),
        name: 'ThemeCategory',
        meta: { title: '类别配置', activeMenu: '/cms/web/theme' }
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_BASE_URL),
  routes: constantRoutes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } 
      return { top: 0 }
  },
});

export default router;
