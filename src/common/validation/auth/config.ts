import * as yup from 'yup';

import { messages } from './messages';

export interface UserReq {
  email?: string;
  password?: string;
  pos_id?: number;
}

export const loginValidate = yup
  .object({
    email: yup.string().email(messages.format.email).required(messages.required.email),
    password: yup.string().required(messages.required.password),
    pos_id: yup.number().required(messages.required.pos_id).moreThan(0, messages.required.pos_id),
  })
  .required();

export const initValues: UserReq = {
  email: '',
  password: '',
  pos_id: 0,
};
