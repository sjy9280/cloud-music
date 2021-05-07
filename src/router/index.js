import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: 'layout' */'@/views/layout/index'),
    children: [
      {
        path: '/',
        name: 'recommend',
        component: () => import(/* webpackChunkName: 'discover' */'@/views/find-music/music-recommend'),
      },
      {
        path: '/song-list',
        name: 'songList',
        component: () => import(/* webpackChunkName: 'songList' */'@/views/find-music/song-list'),
      },
      {
        path: '/news-radio',
        name: 'newsRadio',
        component: () => import(/* webpackChunkName: 'newsRadio' */'@/views/find-music/news-radio'),
      },
      {
        path: '/rank-list',
        name: 'rankList',
        component: () => import(/* webpackChunkName: 'rankList' */'@/views/find-music/rank-list'),
      },
      {
        path: '/singer',
        name: 'singer',
        component: () => import(/* webpackChunkName: 'singer' */'@/views/find-music/singer'),
      },
      {
        path: '/newest-song',
        name: 'newestSong',
        component: () => import(/* webpackChunkName: 'newestSong' */'@/views/find-music/newest-song'),
      },
      {
        path: '/private-fm',
        name: 'privateFM',
        component: () => import(/* webpackChunkName: 'privateFM' */'@/views/private-FM/index'),
        meta: { requiresAuth: true }
      },
      {
        path: '/video',
        name: 'video',
        component: () => import(/* webpackChunkName: 'video' */'@/views/video/index')
      },
      {
        path: '/friends',
        name: 'friends',
        component: () => import(/* webpackChunkName: 'friends' */'@/views/friends/index')
      }
    ]
  }
]

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  routes
})

export default router
