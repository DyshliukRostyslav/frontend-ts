import * as businessRules from './rules/business-rules';
import { get, post, put } from './http/http';
import * as features from './features';
import * as sysSettings from './sys-settings';
import * as processes from './processes';
import * as rights from './rights';

export const getCoreExports = () => ({
  http: {
    client: {
      get,
      post,
      put
    }
  },
  features,
  sysSettings,
  processes,
  rights,
  rules: businessRules
});
