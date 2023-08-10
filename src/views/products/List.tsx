import React, { Fragment, useState } from 'react';
import { Edit, Trash2 } from 'react-feather';

import { AxiosResponse } from 'axios';

import { IPost } from '@/types/auth';
import { IProduct } from '@/types/product';

import useLocalStorageState from '@/hooks/useLocalStorageState';

import { formatNumber } from '@/helper';
import Breadcrumb from '@/layout/Breadcrumb';
import { useFetchProductQuery } from '@/query/FetchList';

const ProductList = (): JSX.Element => {
  const [perPage, setPerPage] = useState(12);
  const [point] = useLocalStorageState<IPost | null>('point_sale', null);
  const { isLoading, data: listProduct } = useFetchProductQuery(point?.stock_location?.id, perPage);

  const loadListProduct = (): void => {
    const { meta } = listProduct as AxiosResponse & { meta: Record<string, string> };
    if (parseInt(meta.per_page) < parseInt(meta.total)) {
      setPerPage(perPage + 8);
    }
  };

  return (
    <Fragment>
      <Breadcrumb title="Product List" parent="Physical" />
    </Fragment>
  );
};

export default ProductList;
