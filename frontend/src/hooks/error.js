import { useContext } from 'react';
import { GlobalContext } from '../GlobalState';

export const useError = () => useContext(GlobalContext).error;
