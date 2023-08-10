import { useEffect, useState } from 'react';

import { Card } from 'flowbite-react';
import { useRecoilValue } from 'recoil';

import { IProduct } from '@/types/product';

import ItemCarts from '@/components/ItemCart';

import { getAllProduct } from '@/database/Product';
import { numberProduct } from '@/recoil/atom/SaleOfPoint';
import { formatNumber } from '@/helper';

const SaleQuick = (): JSX.Element => {
  const [listProductChoice, setListProductChoice] = useState<IProduct[]>([]);
  const countProduct = useRecoilValue(numberProduct);

  const fetchList = async (): Promise<void> => {
    const newList = await getAllProduct();
    setListProductChoice(() => [...newList]);
  };

  useEffect(() => {
    fetchList();
  }, [countProduct || listProductChoice]);


  return (
    <div className="m-2.5 grid grid-cols-3 gap-2">
      <div className="col-span-2">
        {listProductChoice?.map((item, idx) => (
          <ItemCarts
            index={idx + 1}
            widthName="w-64"
            code={item.id}
            numberQuanlity={1}
            put={0}
            id={item.id.toString()}
            key={item.id + idx}
            totalPrice={formatNumber(item.price)}
            price={formatNumber(item.price)}
            inventory={item.quantity_available}
            name={item.name}
          />
        ))}
      </div>
      <div className="col-span-1">
        <Card>asdsa</Card>
      </div>
    </div>
  );
};

// javascript:void(0)

export default SaleQuick;
