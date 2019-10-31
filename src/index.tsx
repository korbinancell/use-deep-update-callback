import { useCallback } from 'react';

export function useDeepUpdateCallback<T>(
  originalObject: T,
  pathTo: ReadonlyArray<string>,
  callback: (newObject: T) => void
) {
  const update = useCallback(
    (newValue: any) => {
      const layerList = [{ ...originalObject }];
      for (let i = 0; i < pathTo.length - 1; ++i) {
        layerList.unshift({ ...layerList[0][pathTo[i]] });
      }

      layerList[0][pathTo[pathTo.length - 1]] = newValue;
      for (let i = 1; i < pathTo.length; ++i) {
        layerList[i][pathTo[pathTo.length - i - 1]] = layerList[i - 1];
      }

      callback(layerList[layerList.length - 1]);
    },
    [originalObject, callback, ...pathTo]
  );

  return update;
}

export function useDeepToggleCallback<T>(
  originalObject: T,
  pathTo: ReadonlyArray<string>,
  currentValue: boolean,
  callback: (newObject: T) => void
) {
  const updateCallback = useDeepUpdateCallback(
    originalObject,
    pathTo,
    callback
  );
  const toggleCallback = useCallback(() => updateCallback(!currentValue), [
    currentValue
  ]);

  return toggleCallback;
}
