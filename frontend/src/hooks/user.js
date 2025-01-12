import { useContext } from 'react';
import { GlobalContext } from '../GlobalState';

export const useUser = () => useContext(GlobalContext).user;
