
const routes = [
  {
    path: '/',
    component: () => import('pages/login.vue')
  },
  {
    path: '/login',
    component: () => import('pages/login.vue')
  },
  {
    path: '/resetPassword',
    component: () => import('pages/resetPassword.vue')
  },
  {
    path: '/newuser',
    component: () => import('pages/newuser.vue')
  },
  {
    path: '/admin',
    component: () => import('layouts/HomeLayout.vue'),
    children: [
      {
        path: '/',
        component: () => import('pages/adminHome.vue')
      }
    ]
  },
  {
    path: '/researcher',
    component: () => import('layouts/HomeLayout.vue'),
    children: [
      {
        path: '/',
        component: () => import('pages/researcherHome.vue')
      },
      {
        path: '/studyDesign/:propTeamKey',
        component: () => import('pages/StudyDesign.vue'),
        props: true
      },
      {
        path: '/studyDesign/:propTeamKey/:propStudyKey',
        component: () => import('pages/StudyDesign.vue'),
        props: true
      },
      {
        path: '/studyStats/:studyKey',
        component: () => import('pages/studyStats.vue'),
        props: true
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
