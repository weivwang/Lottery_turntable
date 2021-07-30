import Vue from 'vue'
import Router from 'vue-router'
import Admin from '@/components/Admin'
import TurnTable from '@/components/TurnTable'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    },
    {
      path: '/',
      name: 'TurnTable',
      component: TurnTable
    }
  ]
})
