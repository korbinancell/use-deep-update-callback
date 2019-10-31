/* global describe, it, expect,  */
import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { useDeepUpdateCallback, useDeepToggleCallback } from '../';

describe('useDeepUpdateCallback', () => {
  it('is truthy', () => {
    expect(useDeepUpdateCallback).toBeTruthy();
  });

  it('updates 1 level', () => {
    const startingValue = {
      value1: '',
      value2: 'test',
      value3: { innerValue1: { innerValue2: 'test' } }
    };
    const callback = jest.fn();
    const { result } = renderHook(() =>
      useDeepUpdateCallback(startingValue, ['value1'], callback)
    );

    const newValue = 'newValue';
    act(() => {
      result.current(newValue);
    });

    expect(callback).toHaveBeenCalledWith({
      ...startingValue,
      value1: newValue
    });
  });

  it('updates 2 levels', () => {
    const startingValue = {
      value1: '',
      value2: 'test',
      value3: { innerValue1: { innerValue2: 'test' }, innerValue3: 'test' }
    };
    const callback = jest.fn();
    const { result } = renderHook(() =>
      useDeepUpdateCallback(startingValue, ['value3', 'innerValue1'], callback)
    );

    const newValue = { innerValue2: 'newValue' };
    act(() => {
      result.current(newValue);
    });

    expect(callback).toHaveBeenCalledWith({
      ...startingValue,
      value3: { ...startingValue.value3, innerValue1: newValue }
    });
  });

  it('updates 3 levels', () => {
    const startingValue = {
      value1: '',
      value2: 'test',
      value3: {
        innerValue1: { innerValue2: 'test', innerValue4: 'test' },
        innerValue3: 'test'
      }
    };
    const callback = jest.fn();
    const { result } = renderHook(() =>
      useDeepUpdateCallback(
        startingValue,
        ['value3', 'innerValue1', 'innerValue2'],
        callback
      )
    );

    const newValue = 'newValue';
    act(() => {
      result.current(newValue);
    });

    expect(callback).toHaveBeenCalledWith({
      ...startingValue,
      value3: {
        ...startingValue.value3,
        innerValue1: {
          ...startingValue.value3.innerValue1,
          innerValue2: newValue
        }
      }
    });
  });
});

describe('useDeepToggleCallback', () => {
  it('is truthy', () => {
    expect(useDeepToggleCallback).toBeTruthy();
  });

  it('updates 1 level', () => {
    const startingValue = {
      value1: false,
      value2: 'test',
      value3: { innerValue1: { innerValue2: 'test' } }
    };
    const callback = jest.fn();
    const { result } = renderHook(() =>
      useDeepToggleCallback(
        startingValue,
        ['value1'],
        startingValue.value1,
        callback
      )
    );

    act(() => {
      result.current();
    });

    expect(callback).toHaveBeenCalledWith({
      ...startingValue,
      value1: true
    });
  });

  it('updates 2 levels', () => {
    const startingValue = {
      value1: '',
      value2: 'test',
      value3: { innerValue1: false, innerValue3: 'test' }
    };
    const callback = jest.fn();
    const { result } = renderHook(() =>
      useDeepToggleCallback(
        startingValue,
        ['value3', 'innerValue1'],
        startingValue.value3.innerValue1,
        callback
      )
    );

    act(() => {
      result.current();
    });

    expect(callback).toHaveBeenCalledWith({
      ...startingValue,
      value3: { ...startingValue.value3, innerValue1: true }
    });
  });

  it('updates 3 levels', () => {
    const startingValue = {
      value1: '',
      value2: 'test',
      value3: {
        innerValue1: { innerValue2: false, innerValue4: 'test' },
        innerValue3: 'test'
      }
    };
    const callback = jest.fn();
    const { result } = renderHook(() =>
      useDeepToggleCallback(
        startingValue,
        ['value3', 'innerValue1', 'innerValue2'],
        startingValue.value3.innerValue1.innerValue2,
        callback
      )
    );

    act(() => {
      result.current();
    });

    expect(callback).toHaveBeenCalledWith({
      ...startingValue,
      value3: {
        ...startingValue.value3,
        innerValue1: {
          ...startingValue.value3.innerValue1,
          innerValue2: true
        }
      }
    });
  });
});
