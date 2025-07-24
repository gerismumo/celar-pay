import { Transaction } from '@/types';

const transactions: Transaction[] = [
  {
    id: '1',
    recipient: 'Sophia Carter',
    amount: 50.00,
    currency: 'USD',
    timestamp: '10:30 AM',
    recipientAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80',
  },
  {
    id: '2',
    recipient: 'Liam Bennett',
    amount: 25.00,
    currency: 'USD',
    timestamp: 'Yesterday',
    recipientAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80',
  },
  {
    id: '3',
    recipient: 'Ava Thompson',
    amount: 75.00,
    currency: 'USD',
    timestamp: '2 days ago',
    recipientAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80',
  },
  {
    id: '4',
    recipient: 'Noah Parker',
    amount: 100.00,
    currency: 'USD',
    timestamp: '3 days ago',
    recipientAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80',
  },
  {
    id: '5',
    recipient: 'Isabella Hayes',
    amount: 30.00,
    currency: 'USD',
    timestamp: '4 days ago',
    recipientAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80',
  },
];

export default transactions;