import { useRef, useState } from 'react';
// eslint-disable-next-line
//@ts-ignore.
import Slider from 'react-slick';


import './TabBill.scss';

type TabBillProps = {
  color: string;
};
const tabsMock = [{ name: 'Don Hang 1' }];
const TabBill = ({ color }: TabBillProps): JSX.Element => {
  const scrl = useRef({ scrollLeft: 0, scrollWidth: 0, offsetWidth: 0 });

  const [tabs, setTabs] = useState(tabsMock);
  const [openTab, setOpenTab] = useState(0);

  const onChangeTab = (index: number): void => {
    setOpenTab(index);
  };
  const onCloseTabBill = (index: number): void => {
    if (tabs.length > 1) setTabs((prevTabs) => prevTabs.filter((_, i) => i !== index));
    if (tabs.length === 2) onChangeTab(0);
  };

  const onAddTabBill = (): void => {
    const str = tabs?.[tabs.length - 1]?.name ?? '';
    const match = str.match(/\d+/);
    const number = match ? parseInt(match[0], 10) : NaN;
    setTabs((preTab) => [...preTab, { name: `Don Hang ${Number.isNaN(number) ? 1 : number + 1}` }]);
  };

  const onSwapTabMode = (index: number): void => {
    return;
  };

  const settings = {
    infinite: false,
    dots: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  return (
    <div className="flex items-center justify-start ml-8" style={{ width: '460px' }}>
      <Slider {...settings} className="w-full">
        {tabs.length > 0 &&
          tabs.map((item, index) => (
            <div
              key={index}
              className={
                'flex justify-between items-center min-w-fit whitespace-nowrap p-1 cursor-pointer text-xs font-bold uppercase shadow-lg rounded block leading-normal transition-all ease-in-out ' +
                (openTab !== index ? 'text-white bg-' + color + '-600' : 'text-' + color + '-600 bg-white')
              }
              data-toggle="tab"
              role="tadivst"
            >
              <button
                className="p-1 hover:bg-green-400 hover:rounded hover:text-white transition-all ease-in-out"
                onClick={() => onSwapTabMode(index)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                  />
                </svg>
              </button>
              <span className="flex justify-between items-center p-1" onClick={() => onChangeTab(index)}>
                {item.name}
              </span>
              <button
                className="p-1 hover:bg-red-400 hover:rounded hover:text-white transition-all ease-in-out"
                onClick={() => onCloseTabBill(index)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
      </Slider>
      <button
        className="flex items-center justify-center ml-8 h-8 text-white border rounded hover:bg-purple-500 transition-all ease-in-out"
        onClick={onAddTabBill}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </button>
    </div>
  );
};
export default TabBill;
