import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/sign-in');
  return <main>URL Shortener App</main>;
}
