import { useState } from 'react';

interface useMutationState {
  loading: boolean;
  data?: object;
  error?: object;
}

type useMutationResult = [(data: any) => void, useMutationState];

export default function useMutation(url: string): useMutationResult {
  const [state, setState] = useState({ loading: false, data: undefined, error: undefined });

  function mutation(data: any) {
    setState((prev) => ({ ...prev, loading: true }));
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json().catch(() => {}))
      .then((data) => setState((prev) => ({ ...prev, data })))
      .catch((error) => setState((prev) => ({ ...prev, error })))
      .finally(() => setState((prev) => ({ ...prev, loading: false })));
  }
  return [mutation, { ...state }];
}
