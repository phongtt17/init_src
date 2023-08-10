import { UseQueryResult, useQuery } from 'react-query';

import { AxiosResponse } from 'axios';
import { useSetRecoilState } from 'recoil';

import { http } from './https';
import { loading } from '@/recoil/atom';

const useFetchQuery = (): UseQueryResult<AxiosResponse> => {
  const setLoading = useSetRecoilState(loading);
  return useQuery(['post_id'], async () => {
    setLoading(true);
    const data = await http.get('pos/config/list_pos');
    setLoading(false);
    return data;
  });
};

const useFetchProductQuery = (stock_location_id?: number, per_page = 0): UseQueryResult<AxiosResponse> => {
  return useQuery(['list_product', stock_location_id, per_page], async () => {
    if (stock_location_id) return await http.get('pos/products', { params: { per_page, stock_location_id } });
    return null;
  });
};

export { useFetchQuery, useFetchProductQuery };
