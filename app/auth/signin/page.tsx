'use client';

import SignInForm from '@/components/admin/SignInForm';
import Loader from '@/components/ui/Loader';

import { useEffect, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';

import { ClientSafeProvider, getProviders, signIn } from 'next-auth/react';

export default function SignInPage() {
  const [providers, setProviders] = useState<Record<
    string,
    ClientSafeProvider
  > | null>(null);

  useEffect(() => {
    const fetchProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };

    fetchProviders();
  }, []);

  if (!providers) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-semibold mb-6">Welcome I.A.</h1>
      {Object.values(providers)
        .reverse()
        .map((provider) =>
          provider.name === 'Credentials' ? (
            <SignInForm key={provider.name} />
          ) : (
            <div key={provider.name} className="mt-6">
              <button
                onClick={() =>
                  signIn(provider.id, { callbackUrl: '/admin/dashboard' })
                }
                className="bg-mainLightColor px-6 py-4 flex gap-2 rounded-xl border-[1px] border-transparent hover:bg-mainDarkColor hover:text-mainLightColor transition-colors shadow-xl"
              >
                <FcGoogle size={24} /> Sign in with {provider.name}
              </button>
            </div>
          ),
        )}
    </div>
  );
}
