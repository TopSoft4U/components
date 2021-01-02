import React from "react";

enum AsyncStatus {
  Idle,
  InProgress,
  Success,
  Error
}

export const useAsync = <T, E = string>(
  func: () => Promise<T>,
  immediate = false
) => {
  const [status, setStatus] = React.useState<AsyncStatus>(AsyncStatus.Idle);
  const [value, setValue] = React.useState<T | null>(null);
  const [error, setError] = React.useState<E | null>(null);

  const execute = React.useCallback(() => {
    setStatus(AsyncStatus.InProgress);
    setValue(null);
    setError(null);

    return func()
      .then((response: any) => {
        setValue(response);
        setStatus(AsyncStatus.Success);
      })
      .catch((ex: any) => {
        setError(ex);
        setStatus(AsyncStatus.Error);
      });
  }, [func]);

  React.useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return {execute, inProgress: status === AsyncStatus.InProgress, status, value, error};
};
