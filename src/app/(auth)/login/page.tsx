// src/app/(auth)/login/page.tsx
import Link from 'next/link';

export default function LoginPage() {
    return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h1>Login Page</h1>
            <p>This is a placeholder for the login form.</p>
            <Link href="/dashboard">Go to Dashboard (mock)</Link>
        </div>
    )
}
