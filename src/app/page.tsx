import Link from 'next/link';

export default function HomePage() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Welcome to the Homepage!</h1>
      <p>This is a placeholder page to confirm the routing is working.</p>
      <nav>
        <Link href="/login">Login</Link> | <Link href="/dashboard">Dashboard</Link>
      </nav>
    </div>
  );
}
