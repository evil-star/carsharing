import { useDispatch } from 'react-redux';
import store from '../state/store';

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
