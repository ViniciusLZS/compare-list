import { useCallback } from 'react';
import useIsMounted from './useIsMounted';

export default function useSafeAsyncAction() {
  const isMounted = useIsMounted();

  const runSafeAsyncAction = useCallback((Callback: () => void) => {
    if (isMounted()) {
      Callback();
    }
  }, [isMounted]);

  return runSafeAsyncAction;
}
