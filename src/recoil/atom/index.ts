import { IPost } from '@/types/auth'
import { atom } from 'recoil'

export const countState = atom({
  key: 'count',
  default: 0,
})

export const listPosSate = atom({
  key: 'listPos',
  default: [] as IPost[]
})


export const loading = atom({
  key: 'loading',
  default: false
})

export const toast = atom({
  key: 'toast',
  default: {
    message: '',
    type: '',
    show: false
  }
})