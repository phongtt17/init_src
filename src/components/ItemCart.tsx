import { KeyboardEvent, useCallback, useState, useTransition } from 'react';
import { AlignJustify, MinusCircle, Plus, PlusCircle, Trash2 } from 'react-feather';

import { Button, Card, TextInput, Tooltip } from 'flowbite-react';
import ButtonGroup from 'flowbite-react/lib/esm/components/Button/ButtonGroup';
import { useSetRecoilState } from 'recoil';

import { TypeItemCarts } from '@/types/pointOfSlae';

import Popover from './Popover';
import { deleteProduct } from '@/database/Product';
import { numberProduct } from '@/recoil/atom/SaleOfPoint';

const ItemCarts = (props: TypeItemCarts): JSX.Element => {
  const [showIcon, setShowIcon] = useState(false);
  const [activeBtn, setActiveBtn] = useState<number>(1);
  const [listCarts, setListCarts] = useState<TypeItemCarts[]>([props]);
  const setCountProduct = useSetRecoilState(numberProduct);
  const [,startTransition] = useTransition();

  const countQuantity = (e: KeyboardEvent<HTMLInputElement>): void => {
    const listAnotherString = ['ArrowLeft', 'Backspace', 'ArrowRight'];
    if (!/^\d+$/.test(e.key) && !listAnotherString.includes(e.code)) {
      e.preventDefault();
    }
  };

  const addCarts = (): void => {
    setListCarts((prevList) => [...prevList, props]);
  };

  const removeCarts = (index: number): void => {
    setListCarts((prevCarts) => {
      if (index === 0) {
        deleteProduct(parseInt(props.id));
        setTimeout(() => {
          setCountProduct((prevCount) => prevCount + 1);
        }, 200);
        return [];
      }
      return prevCarts.filter((item, idx) => idx !== index);
    });
  };

  const setInventory = useCallback(
    (idx: number, type: string) => {
      const listItemUpdate = listCarts.map((item, index) => {
        if (index === idx) {
          const updatedNumberQuantity = item.numberQuanlity + (type === 'minus' ? -1 : 1);
          return { ...item, numberQuanlity: updatedNumberQuantity || 1 };
        }
        return item;
      });
      setListCarts(() => [...listItemUpdate]);
    },
    [listCarts]
  );

  const changeInputQuality = useCallback(
    (value: string, idx: number) => {
      const listItemUpdate = listCarts.map((item, index) => {
        if (index === idx) {
          return { ...item, numberQuanlity: parseInt(value) };
        }
        return item;
      });
      setListCarts(() => [...listItemUpdate]);
    },
    [listCarts]
  );

  const contentPopup = (
    <Card className="bg-gradient-to-r from-purple-400 to-blue-500">
      <div>
        <TextInput color="gray" placeholder="Đơn giá" />
      </div>
      <div className="flex gap-x-2">
        <TextInput color="gray" placeholder="Giảm giá" />
        <ButtonGroup>
          <Button
            color="gray"
            className="border-none"
            onClick={() => setActiveBtn(1)}
            gradientMonochrome={activeBtn !== 1 ? '' : 'failure'}
          >
            VND
          </Button>
          <Button
            color="gray"
            className="border-none"
            onClick={() => setActiveBtn(2)}
            gradientMonochrome={activeBtn !== 2 ? '' : 'failure'}
          >
            %
          </Button>
        </ButtonGroup>
      </div>
      <div>
        <TextInput color="gray" placeholder="Giá bán" />
      </div>
    </Card>
  );

  return (
    <div className="grid grid-cols-1">
      <div
        className="px-4 flex rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 flex-col bg-gradient-to-r from-teal-200 via-sky-200 to-blue-200 hover:border-blue-500 active:border-blue-500"
        onMouseEnter={() => setShowIcon(true)}
        onMouseLeave={() => setShowIcon(false)}
      >
        {listCarts?.map((item, idx) => (
          <div
            className={`text-stone-600 gap-x-4 flex items-center border-dashed border-green-50 ${
              idx !== listCarts.length - 1 ? 'border-b-2' : ''
            }`}
            key={item?.id + idx.toString()}
          >
            <div className="flex gap-x-4 items-center my-2">
              <span className={`text-lg ${idx !== 0 ? 'invisible' : 'visible'}`}>{item?.index}</span>{' '}
              <Trash2 onClick={() => removeCarts(idx)} size={20} cursor={'pointer'} />
              <span className={`text-base ${idx !== 0 ? 'invisible' : 'visible'}`}>{item.code}</span>
            </div>
            <div className={`text-base my-2 ${item.widthName} ${idx !== 0 ? 'invisible' : 'visible'}`}>{item.name}</div>
            <div className="flex gap-x-4 items-center my-2">
              <Tooltip content={`Tồn: ${item.inventory} - Đặt: ${item.put}`} style="light" placement="bottom" animation={'duration-300'}>
                <div className="flex gap-x-4 items-center">
                  {
                    <MinusCircle
                      size={20}
                      cursor={'pointer'}
                      onClick={() => setInventory(idx, 'minus')}
                      className={`${showIcon ? 'visible' : 'invisible'}`}
                    />
                  }
                  <input
                    value={item.numberQuanlity || 1}
                    onChange={({ target: { value } }) => changeInputQuality(value, idx)}
                    onKeyDown={(e) => countQuantity(e)}
                    type="text"
                    className="lining-nums bg-transparent border-solid border-2 border-indigo-500/50 text-gray-900 text-center w-12 rounded"
                  />
                  {
                    <PlusCircle
                      onClick={() => setInventory(idx, 'plus')}
                      size={20}
                      cursor={'pointer'}
                      className={`${showIcon ? 'visible' : 'invisible'}`}
                    />
                  }
                </div>
              </Tooltip>
              <Popover content={contentPopup} className={'right-52'}>
                <input
                  disabled
                  value={item.price}
                  type="text"
                  className="lining-nums cursor-pointer bg-transparent border-solid border-2 border-indigo-500/50 text-gray-900 text-center w-fit rounded"
                />
              </Popover>
            </div>
            <div className="ml-4 text-lg flex items-center gap-x-4">
              <span className="w-36">{item.price}</span>
              <Plus size={20} cursor={'pointer'} onClick={addCarts} />
              <AlignJustify size={20} cursor={'pointer'} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemCarts;
