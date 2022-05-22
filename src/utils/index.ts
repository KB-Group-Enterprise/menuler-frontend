import numberWithCommas from './helper/numberWithCommas';
import { injectStrict } from './injectStrict';

function hasKey<O>(obj: O, key: PropertyKey): key is keyof O {
  return key in obj;
}

export const utils = {
  injectStrict,
  hasKey,
  numberWithCommas,
};
