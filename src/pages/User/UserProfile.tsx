import { UserProfile as Profile } from '@/components/UserProfile';

export default function UserProfile() {
  const user = { name: 'Nguyễn Văn A', email: 'user@auto88.com', role: 'customer' };
  return <Profile user={user} />;
}
