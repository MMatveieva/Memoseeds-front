import Vue from 'vue'
import Router from 'vue-router'
import SignUp from '@/components/SignUp'
import SignIn from '@/components/SignIn'
import Settings from '@/components/Settings'
import Recent from '@/components/Recent'
import ModulePage from '@/components/ModulePage'
import AllModules from '@/components/AllModules'
import BuyCredits from '@/components/BuyCredits'
import Learning from '@/components/Learning'
import Writing from '@/components/Writing'

Vue.use(Router);

const ifAuthenticated = (to, from, next) =>
{
  let access_token = Vue.cookies.isKey("user_session");
  if(access_token)
  {
    next()
    return
  }
  next('/signIn')
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/signUp',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/signIn',
      name: 'signIn',
      component: SignIn
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/recent',
      name: 'recent',
      component: Recent,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/module/:id',
      name: 'modulePage',
      component: ModulePage,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/allModules',
      name: 'allModules',
      component: AllModules,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/buyCredits',
      name: 'buyCredits',
      component: BuyCredits,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/learn',
      name: 'learn',
      component: Learning,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/write',
      name: 'write',
      component: Writing,
      beforeEnter: ifAuthenticated
    }
  ]
})
