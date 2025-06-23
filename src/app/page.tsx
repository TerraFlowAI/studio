// src/app/page.tsx
import Link from 'next/link';
export default function LandingPage() {
  return (
    <div>
      <h1>Welcome to TerraFlow</h1>
      <Link href="/login">Go to Login</Link>
    </div>
  );
}
