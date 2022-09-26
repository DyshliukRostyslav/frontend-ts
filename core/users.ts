import { getContactRoles } from './rights';
import { Guid } from './structures/guid';
import { Lookup } from './ui/models/ui';

export type CurrentUser = Lookup & {
  account: Lookup
  contact: Lookup
  culture: Lookup
  roles: Array<Guid>
};

const currentUser = window.Terrasoft.SysValue.CURRENT_USER as CurrentUser;

currentUser.contact = window.Terrasoft.SysValue.CURRENT_USER_CONTACT;
currentUser.account = window.Terrasoft.SysValue.CURRENT_USER_ACCOUNT;
currentUser.culture = window.Terrasoft.SysValue.CURRENT_USER_CULTURE;

getContactRoles(currentUser.contact.value).then(result => currentUser.roles = result);

export const CURRENT_USER = currentUser;
