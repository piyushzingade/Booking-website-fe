import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../Redux/store.ts';

export const useAppDispatch: () => AppDispatch = useDispatch;
