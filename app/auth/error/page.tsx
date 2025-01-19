'use client';

import { Button } from '@/components/ui';

import { useRouter } from 'next/navigation';

export default function ErrorPage() {
  const router = useRouter();
  return (
    <div className="text-center bg-mainLightColor rounded-3xl shadow-lg px-4 py-6 flex flex-col items-center gap-5">
      <h1 className="text-4xl font-semibold text-error">Access Denied</h1>
      <p className="font-semibold">
        Your Google account is not authorized to access this website.
      </p>
      <Button onClick={() => router.replace('/auth/signin')}>Sign In</Button>
    </div>
  );
}
