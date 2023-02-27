import { combineComponents } from './combine';
import { ToastProvider } from './ToastContext';

const providers = [ToastProvider];
export const AppContextProvider: any = combineComponents(...providers);
