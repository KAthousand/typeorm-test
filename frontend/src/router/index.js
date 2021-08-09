import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login/Login.vue'
import Register from '../views/Register/Register.vue'

import PostsContainer from '../containers/PostsContainer/PostsContainer.vue'
import Posts from '../views/PostScreens/Posts.vue'
import CreatePost from '../views/PostScreens/CreatePost.vue'
import PostDetail from '../views/PostScreens/PostDetail.vue'
import PostEdit from '../views/PostScreens/PostEdit.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/',
    name: 'PostsContainer',
    component: PostsContainer,
    children: [
      { path: '/create', component: CreatePost },
      { path: '/:id/edit', component: PostEdit },
      { path: '/:id', component: PostDetail},
      { path: '/', component: Posts }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
