export const navigation = [
  {
    text: 'Home',
    path: '/home',
    icon: 'home'
  },
  {
    text: 'Examples',
    icon: 'folder',
    items: [
      {
        text: 'Profile',
        path: '/profile'
      },
      {
        text: 'Tasks',
        path: '/tasks'
      },
      {
        text: '직원 관리',
        path: '/employee'
      }
    ]
  },
  {
    text: '영화',
    icon: 'home',
    items: [
      {
        text: '영화 관리',
        path: '/movies'
      }/*,
      {
        text: '예매',
        path: '/tasks'
      }*/
    ]
  },
  {
    text: '예매',
    path: '/schedule',
    icon: 'floppy'
  }
];
