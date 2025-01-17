import { KeyedMutator } from 'swr';

export function handleOptimisticMutate<T>(
  mutate: KeyedMutator<T>,
  updateFn: (_cachedData: T | undefined) => T | undefined,
) {
  return mutate(updateFn, {
    optimisticData: (currentData) => updateFn(currentData) as T,
    rollbackOnError: true,
    revalidate: false,
  });
}
