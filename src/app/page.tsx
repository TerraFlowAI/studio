// src/app/page.tsx

import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">Welcome to TerraFlow</h1>
      <p className="mt-4 text-lg">The AI Operating System for Real Estate is loading.</p>
      <div className="mt-8 space-x-4">
        <Link href="/login" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Go to Login
        </Link>
        <Link href="/dashboard" className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}