import Vue from 'vue'
import Router from 'vue-router'
import SignUp from '@/components/SignUp'
import SignIn from '@/components/SignIn'
import Settings from '@/components/Settings'
import Recent from '@/components/Recent'
import ModulePage from '@/components/ModulePage'
import AllModules from '@/components/AllModules'
import BuyCredits from '@/components/BuyCredits'

Vue.use(Router);

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
      component: Settings
    },
    {
      path: '/recent',
      name: 'recent',
      component: Recent
    },
    {
      path: '/module',
      name: 'modulePage',
      component: ModulePage
    },
    {
      path: '/allModules',
      name: 'allModules',
      component: AllModules
    },
    {
      path: '/buyCredits',
      name: 'buyCredits',
      component: BuyCredits
    }
  ]
})
