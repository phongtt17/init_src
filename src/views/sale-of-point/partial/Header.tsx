import { ChangeEvent, Fragment, useCallback, useEffect, useRef, useState } from 'react';

import { IPost } from '@/types/auth';
import { IProduct } from '@/types/product';

import useLocalStorageState from '@/hooks/useLocalStorageState';

import ButtonDropDown from '@/components/ButtonDropDown';
import AutoComplete from '@/components/inputComplete';

import TabBill from './header/TabBill';
import { addProduct, checkConnection, getAllProduct } from '@/database/Product';
import Loading from '@/layout/Loading';
import { useFetchProductQuery } from '@/query/FetchList';
import { useRecoilState } from 'recoil';
import { numberProduct } from '@/recoil/atom/SaleOfPoint';

const Header = (): JSX.Element => {
  const refBtnDropDown = useRef(null);
  const refAutoComple = useRef(null);
  const [countProduct, setCountProduct] = useRecoilState(numberProduct);
  const [point] = useLocalStorageState<IPost | null>('point_sale', null);
  const { isLoading, data: listProduct } = useFetchProductQuery(point?.stock_location?.id);
  const [listOption, setListOption] = useState<IProduct[]>([]);

  const setListProducts = async (): Promise<void> => {
    const listProductChoice = await getAllProduct();
    const newItem = listProduct?.data.filter((item: IProduct) => !listProductChoice.some((value) => value.name === item.name));
    setListOption(() => newItem);
    if (listProductChoice?.length) setCountProduct(listProductChoice.length)
  };

  useEffect(() => {
    setListProducts();
  }, [listProduct?.data.length, countProduct]);

  const handleOptionClick = async (option: IProduct): Promise<void> => {
    if (await checkConnection) await addProduct(option);
    if (listOption?.length) setListProducts();
  };

  const changeInput = useCallback(
    async ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      const listProductChoice = await getAllProduct();
      const findItem = listProduct?.data?.filter((item: IProduct) => item.name.toLowerCase().includes(value.toLowerCase())) as IProduct[];
      const newItem = findItem?.filter((item) => !listProductChoice.some((event) => event.name === item.name));
      setListOption(() => newItem);
      setCountProduct(newItem.length)
    },
    [listOption?.map((item) => item.id)]
  );

  const contentAutoComplete = isLoading ? (
    <Loading />
  ) : (
    listOption?.map((item: IProduct) => (
      <div className="flex items-center px-2 py-2 hover:bg-gray-100 cursor-pointer" key={item.id} onClick={() => handleOptionClick(item)}>
        <div key={item.id} className="flex items-center px-2 py-2 hover:bg-gray-100 cursor-pointer">
          <img src={item?.images?.image_512} alt={item.name} className="h-8 w-8 object-cover rounded-full mr-2" />
          <span>{item.name}</span>
        </div>
      </div>
    ))
  );
  return (
    <Fragment>
      <header className="bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 py-4 shadow-lg">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex w-full">
            <div className="flex items-center w-4/12">
              <ButtonDropDown
                nameDefaultBtn="Options"
                listOption={[
                  { id: 1, name: 'abc' },
                  { id: 2, name: 'tuan' },
                ]}
                refBtn={refBtnDropDown}
                classNameContainer="relative inline-block text-left"
                classNameButton="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 dark:border-gray-700 dark:text-white rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              />
              <div className="relative w-full">
                <AutoComplete
                  onChange={(e) => changeInput(e)}
                  classWidth="w-96"
                  refInput={refAutoComple}
                  contentOptions={contentAutoComplete}
                  classNameInput="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-100 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                />
                <button
                  disabled
                  type="submit"
                  className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
            <TabBill color="blue" />
          </div>
          <nav className="mt-4 md:mt-0">
            <ul className="flex space-x-4">
              <li>
                <a href="/" className="text-white hover:text-gray-200 no-underline">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="text-white hover:text-gray-200 no-underline">
                  About
                </a>
              </li>
              <li>
                <a href="/contact" className="text-white hover:text-gray-200 no-underline">
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </Fragment>
  );
};

export default Header;
