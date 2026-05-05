import { createContext, useContext } from 'react';

interface BSODContextType {
  triggerBSOD: () => void;
}

export const BSODContext = createContext<BSODContextType>({ triggerBSOD: () => {} });

export function useBSOD() {
  return useContext(BSODContext);
}
