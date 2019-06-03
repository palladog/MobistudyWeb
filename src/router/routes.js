
const routes = [
  {
    path: '/',
    component: () => import('pages/Login.vue')
  },
  {
    path: '/login',
    component: () => import('pages/Login.vue')
  },
  {
    path: '/resetPassword',
    component: () => import('pages/ResetPassword.vue')
  },
  {
    path: '/newuser',
    component: () => import('pages/Newuser.vue')
  },
  {
    path: '/admin',
    component: () => import('layouts/HomeLayout.vue'),
    children: [
      {
        path: '/',
        component: () => import('pages/AdminHome.vue')
      }
    ]
  },
  {
    path: '/researcher',
    component: () => import('layouts/HomeLayout.vue'),
    children: [
      {
        path: '/',
        component: () => import('pages/ResearcherHome.vue')
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
        component: () => import('pages/StudyStats.vue'),
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
