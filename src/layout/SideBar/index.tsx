import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// image import
import logo from '@/assets/images/dashboard/multikart-logo.png';

import UserPanel from './UserPannel';
import { MENUITEMS } from '@/common/constant/menu';

const Sidebar = (): JSX.Element => {
  // eslint-disable-next-line
  const [mainmenu, setMainMenu] = useState<any>(MENUITEMS);
  const [isChange, setIsChange] = useState(false);

  // eslint-disable-next-line
  const setNavActive = (item: any) => {
    setIsChange(!isChange);
    MENUITEMS.filter((menuItem) => {
      if (menuItem !== item) menuItem.active = false;
      if (menuItem.children && menuItem.children.includes(item)) menuItem.active = true;
      if (menuItem.children) {
        // eslint-disable-next-line
        (menuItem.children as any).filter((submenuItems: any) => {
          if (submenuItems !== item) {
            submenuItems.active = false;
          }
          if (submenuItems.children) {
            // eslint-disable-next-line
            submenuItems.children.map((childItem: any) => (childItem.active = false));
            if (submenuItems.children.includes(item)) {
              submenuItems.active = true;
              menuItem.active = true;
            }
          }
          return false;
        });
      }
      return false;
    });
    item.active = !item.active;
    setMainMenu(MENUITEMS);
  };

  useEffect(() => {
    const currentUrl = window.location.pathname;
    // eslint-disable-next-line
    mainmenu.map((items: any) => {
      // eslint-disable-next-line
      mainMenu.filter((Items: any) => {
        if (Items.path === currentUrl) setNavActive(Items);
        if (!Items.children) return false;
        // eslint-disable-next-line
        Items.children.filter((subItems: any) => {
          if (subItems.path === currentUrl) setNavActive(subItems);
          if (!subItems.children) return false;
          // eslint-disable-next-line
          subItems.children.filter((subSubItems: any) => {
            if (subSubItems.path === currentUrl) {
              setNavActive(subSubItems);
              return true;
            } else {
              return false;
            }
          });
          return subItems;
        });
        return Items;
      });
      return items;
    });
    return () => {
      setMainMenu(MENUITEMS);
    };
  }, [isChange]);

  // eslint-disable-next-line
  const mainMenu = mainmenu.map((menuItem: any, i: number) => (
    <li className={`${menuItem.active ? 'active' : ''}`} key={i}>
      {menuItem.sidebartitle ? <div className="sidebar-title">{menuItem.sidebartitle}</div> : ''}
      {menuItem.type === 'sub' ? (
        <a
          className="sidebar-header "
          onClick={(event) => {
            event.preventDefault();
            return setNavActive(menuItem);
          }}
        >
          <div className="flex place-items-baseline">
            <menuItem.icon />
            <span>{menuItem.title}</span>
          </div>
          <i className="fa fa-angle-right pull-right"></i>
        </a>
      ) : (
        ''
      )}
      {menuItem.type === 'link' ? (
        <Link
          to={`${menuItem.path}`}
          className={`sidebar-header ${menuItem.active ? 'active' : ''}`}
          onClick={() => setNavActive(menuItem)}
        >
          <div className="flex place-items-baseline">
            <menuItem.icon />
            <span>{menuItem.title}</span>
          </div>
          {menuItem.children ? <i className="fa fa-angle-right pull-right"></i> : ''}
        </Link>
      ) : (
        ''
      )}
      {menuItem.children ? (
        <ul
          className={`sidebar-submenu ${menuItem.active ? 'menu-open' : ''}`}
          style={menuItem.active ? { opacity: 1, transition: 'opacity 500ms ease-in' } : {}}
        >
          {/* eslint-disable-next-line */}
          {menuItem.children.map((childrenItem: any, index: number) => (
            <li key={index} className={childrenItem.children ? (childrenItem.active ? 'active' : '') : ''}>
              {childrenItem.type === 'sub' ? (
                <a
                  href=""
                  onClick={(event) => {
                    event.preventDefault();
                    return setNavActive(childrenItem);
                  }}
                >
                  <i className="fa fa-circle"></i>
                  {childrenItem.title} <i className="fa fa-angle-right pull-right"></i>
                </a>
              ) : (
                ''
              )}

              {childrenItem.type === 'link' ? (
                <Link
                  to={`${childrenItem.path}`}
                  className={childrenItem.active ? 'active' : ''}
                  onClick={() => setNavActive(childrenItem)}
                >
                  <i className="fa fa-circle"></i>
                  {childrenItem.title}{' '}
                </Link>
              ) : (
                ''
              )}
              {childrenItem.children ? (
                <ul className={`sidebar-submenu ${childrenItem.active ? 'menu-open' : 'active'}`}>
                  {/* eslint-disable-next-line */}
                  {childrenItem.children.map((childrenSubItem: any, key: number) => (
                    <li className={childrenSubItem.active ? 'active' : ''} key={key}>
                      {childrenSubItem.type === 'link' ? (
                        <Link
                          to={`${childrenSubItem.path}`}
                          className={childrenSubItem.active ? 'active' : ''}
                          onClick={() => setNavActive(childrenSubItem)}
                        >
                          <i className="fa fa-circle"></i>
                          {childrenSubItem.title}
                        </Link>
                      ) : (
                        ''
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                ''
              )}
            </li>
          ))}
        </ul>
      ) : (
        ''
      )}
    </li>
  ));

  return (
    <Fragment>
      <div className="page-sidebar">
        <div className="main-header-left d-none d-lg-block">
          <div className="logo-wrapper text-center ">
            <Link to={`/`} className="flex justify-center">
              <img className="blur-up lazyloaded" src={logo} alt="logo" width={'33%'} />
            </Link>
          </div>
        </div>
        <div className="sidebar custom-scrollbar">
          <UserPanel />
          <ul className="sidebar-menu">{mainMenu}</ul>
        </div>
      </div>
    </Fragment>
  );
};

export default Sidebar;
