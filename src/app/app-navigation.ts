export const navigation = [
  {
    text: '영화 예매',
    path: '/reservation',
    icon: 'home'
  },
  {
    text: '영화관 관리',
    icon: 'floppy',
    items: [
      {
        text: '영화 관리',
        path: '/movies'
      },
      {
        text: '영화관 관리',
        path: '/theater'
      },
      {
        text: '스케줄 관리',
        path: '/schedule'
      },
      {
        text: '예매 현황',
        path: '/reservationList'
      }
    ]
  }
];
