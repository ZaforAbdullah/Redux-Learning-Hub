// Pre-typed versions of useDispatch and useSelector.
// Use these everywhere instead of importing from react-redux directly —
// they know the shape of the store and support thunk actions.

import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './store';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
