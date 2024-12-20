'use client';

import SignUpForm from '@/app/components/SignUpForm';

export default function SignUpPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-semibold mb-6">SignUp</h1>
      <SignUpForm />
    </div>
  );
}
