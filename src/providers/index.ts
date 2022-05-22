import { EapiKey } from '@/symbols/symbol';
import { injectStrict } from '@/utils/injectStrict';

export const useEapi = () => injectStrict(EapiKey);
