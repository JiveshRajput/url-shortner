import { IUser } from '@/features/common';
import { IUserForm } from '../components';

export const getUpdatedProfilePayload = (current: IUserForm, existed: IUser) => {
  let payload = {} as IUserForm;

  if (current.age !== existed.age) {
    payload.age = current.age;
  }

  if (current.email !== existed.email) {
    payload.email = current.email;
  }

  if (current.name !== existed.name) {
    payload.name = current.name;
  }

  if (current.number !== existed.number) {
    payload.number = current.number;
  }

  console.log('payload', payload);
  return payload;
};
