'use client';

import { postFetcher } from '@/lib/axiosFetchers';

import useSWR from 'swr';

interface UsePaymentIntentProps<T> {
  body?: T | null;
  endpoint: string;
}

export function usePaymentIntent<T>({
  body,
  endpoint,
}: UsePaymentIntentProps<T>) {
  const shouldFetch = Boolean(body);

  const { isLoading, error, data } = useSWR<{ clientSecret: string }>(
    shouldFetch ? [endpoint, body] : null,
    ([url, args]) => postFetcher(url, args),
  );
  return {
    isLoading,
    isError: error,
    clientSecret: data?.clientSecret,
  };
}
