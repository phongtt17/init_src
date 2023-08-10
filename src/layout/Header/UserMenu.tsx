import { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '@/hooks/auth';

//images import
import man from '@/assets/images/dashboard/man.png';

const UserMenu = (): JSX.Element => {
  const { signout } = useAuth();
  return (
    <Fragment>
      <li className="onhover-dropdown">
        <div className="media align-items-center">
          <img
            className="align-self-center pull-right img-50 rounded-full blur-up lazyloaded"
            src={man}
            alt="header-user"
          />
        </div>
        <ul className="profile-dropdown onhover-show-div p-20 profile-dropdown-hover">
          <li>
            <Link to={`/settings/profile`}>
              <i data-feather="user"></i>Edit Profile
            </Link>
          </li>
          <li>
            <a href="">
              <i data-feather="mail"></i>Inbox
            </a>
          </li>
          <li>
            <a href="">
              <i data-feather="lock"></i>Lock Screen
            </a>
          </li>
          <li>
            <a href="">
              <i data-feather="settings"></i>Settings
            </a>
          </li>
          <li>
            <a onClick={signout}>
              <i data-feather="log-out"></i>Logout
            </a>
          </li>
        </ul>
      </li>
    </Fragment>
  );
};

export default UserMenu;
