import {atom} from 'jotai';

export type Bridge = {
  name: string;
  onClick: () => void;
}

export const bridgeAtom = atom<Bridge>({
  name: '',
  onClick: () => {} // noop default
});
