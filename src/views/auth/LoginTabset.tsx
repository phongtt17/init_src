import { yupResolver } from '@hookform/resolvers/yup';

import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { useRecoilState } from 'recoil';

import { IPost, UserFormLoginData } from '@/types/auth';

import InputForward from '@/components/Input';
import SelectCustom from '@/components/Select';

import { initValues, loginValidate } from '@/common/validation/auth/config';
import { useFetchQuery } from '@/query/FetchList';
import { useQueryLogin } from '@/query/auth/login';
import { listPosSate } from '@/recoil/atom';
import useLocalStorageState from '@/hooks/useLocalStorageState';

const LoginTabset = (): JSX.Element => {
  const methods = useForm({ mode: 'all', defaultValues: initValues, resolver: yupResolver(loginValidate) });
  const { errors, isSubmitting } = methods.formState;
  const { register, handleSubmit } = methods;

  const [, setPoint] = useLocalStorageState<IPost | null>('point_sale', null)
  const { data, isLoading } = useFetchQuery();
  const [listPost, setListPost] = useRecoilState(listPosSate);
  const { mutate: loginAction } = useQueryLogin();

  useEffect(() => {
    if (data?.data.length) setListPost(data?.data);
  }, [data]);

  const onSubmit = async (userFormLogin: UserFormLoginData): Promise<void> => {
    const postSale = data?.data.find((item: IPost) => item.id === userFormLogin.pos_id)
    setPoint(postSale)
    loginAction(userFormLogin);
  };
  return (
    <div className="relative flex flex-col justify-center overflow-hidden">
      <div className="w-full p-6 m-auto rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-red-400">Login</h1>
        <FormProvider {...methods}>
          <form className="form-horizontal auth-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-2">
              <InputForward
                type="text"
                className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40"
                {...register('email')}
                placeholder={'Username'}
                error={!!errors?.email}
                helperText={errors?.email?.message}
              />
            </div>
            <div className="mb-2">
              <InputForward
                placeholder={'Password'}
                type="password"
                className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40"
                {...register('password')}
                error={!!errors?.password}
                helperText={errors?.password?.message}
              />
            </div>
            <div className="mb-2">
              <SelectCustom
                className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40 digits"
                {...register('pos_id')}
                error={!!errors?.pos_id}
                listOption={listPost}
                helperText={!!errors?.pos_id && errors.pos_id?.message}
              ></SelectCustom>
            </div>
            <div className="mt-6 text-center">
              <button
                className="w-40 px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-red-400 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
                type="submit"
                disabled={isSubmitting || isLoading}
              >
                Login
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default LoginTabset;
