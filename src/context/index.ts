import { combineComponents } from './combine';
import { StoredValuesProvider } from './StoredValueContext';
import { ToastProvider } from './ToastContext';

const providers = [ToastProvider, StoredValuesProvider];
export const AppContextProvider: any = combineComponents(...providers);
