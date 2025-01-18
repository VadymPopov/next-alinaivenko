import useSWR from 'swr';

import { postFetcher } from '../lib/axiosFetchers';

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
  return { isLoading, error, clientSecret: data?.clientSecret };
}
