import { Fragment, useState } from 'react';
import { AlignLeft, Maximize2, MessageSquare } from 'react-feather';

//images

import Language from './Language';
import UserMenu from './UserMenu';

// eslint-disable-next-line
declare let document: any;

const Header = (): JSX.Element => {
  const [sidebar, setSidebar] = useState(true);
  const [rightSidebar, setRightSidebar] = useState(true);

  const showRightSidebar = (): void => {
    if (rightSidebar) {
      setRightSidebar(false);
      document?.querySelector('.right-sidebar')?.classList.add('show');
    } else {
      setRightSidebar(true);
      document?.querySelector('.right-sidebar')?.classList.remove('show');
    }
  };
  const goFull = (): void => {
    if (
      (document.fullScreenElement && document?.fullScreenElement !== null) ||
      (!document?.mozFullScreen && !document?.webkitIsFullScreen)
    ) {
      if (document.documentElement.requestFullScreen) {
        document.documentElement.requestFullScreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullScreen) {
        document.documentElement.webkitRequestFullScreen();
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  };
  const openCloseSidebar = (): void => {
    if (sidebar) {
      setSidebar(false);
      document.querySelector('.page-main-header').classList.add('open');
      document.querySelector('.page-sidebar').classList.add('open');
      document.querySelector('.footer').classList.add('open');
    } else {
      setSidebar(true);
      document.querySelector('.page-main-header').classList.remove('open');
      document.querySelector('.page-sidebar').classList.remove('open');
      document.querySelector('.footer').classList.remove('open');
    }
  };

  return (
    <Fragment>
      {/* open */}
      <div className="page-main-header">
        <div className="main-header-right flex justify-between">
          <div className="mobile-sidebar col-auto p-0">
            <div className="media-body text-end switch-sm">
              <label className="switch">
                <span onClick={openCloseSidebar}>
                  <AlignLeft />
                </span>
              </label>
            </div>
          </div>
          <div className="nav-right flex">
            <ul className={'nav-menus'}>
              <li>
                <a onClick={goFull} className="text-dark">
                  <Maximize2 />
                </a>
              </li>
              <li className="onhover-dropdown">
                <a className="text-dark" href="">
                  <h6>EN</h6>
                </a>
                <Language />
              </li>
              <li>
                <a onClick={showRightSidebar}>
                  <MessageSquare />
                  <span className="dot"></span>
                </a>
              </li>
              <UserMenu />
            </ul>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Header;
