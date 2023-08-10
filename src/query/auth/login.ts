import { UseMutationResult, useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { AxiosResponse } from 'axios';
import { useSetRecoilState } from 'recoil';
import Swal from 'sweetalert2';

import { ILogin } from '@/types/auth';

import { useAuth } from '@/hooks/auth';

import { http } from '@/query/https';
import { loading } from '@/recoil/atom';

const useQueryLogin = (): UseMutationResult<AxiosResponse, string, ILogin, string> => {
  const { signin } = useAuth();
  const navigate = useNavigate();
  const setLoading = useSetRecoilState(loading);
  return useMutation(
    async (params: ILogin) => {
      setLoading(true);
      const data = await http.post('/pos/login', params);

      return data;
    },
    {
      onSuccess: ({ data }) => {
        setLoading(false);
        signin && signin(data);
        navigate('/#');
      },
      onError: () => {
        setLoading(false);
        Swal.fire({
          title: 'Error !',
          text: 'Password or email not correct',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      },
    }
  );
};

export { useQueryLogin };
