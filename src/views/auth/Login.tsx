import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line
//@ts-ignore.
import Slider from 'react-slick';

// eslint-disable-next-line
//@ts-ignore.
import browserStorage from 'store';

import { useAuth } from '@/hooks/auth';

import stats from '../../assets/images/dashboard/stats.png';
import '../../assets/scss/slick-theme.scss';
import '../../assets/scss/slick.scss';

import LoginTabset from './LoginTabset';

const Login = (): JSX.Element => {
  const { t } = useTranslation();
  const { signin } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const user = browserStorage.get('auth_token');
    if (user?.access_token) {
      signin && signin(user);
      navigate('/');
    }
  }, [browserStorage.get('auth_token')]);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    autoplay: true,
  };
  return (
    <div className="page-wrapper mx-auto">
      <div className="authentication-box flex flex-col items-center justify-center px-4 md:px-0 py-8 md:py-16">
        <div className="container mx-auto">
          <div className="grid grid-cols-12">
            <div className="col-span-12 md:col-span-5 p-0 card-left">
              <div className="card bg-primary">
                <div className="svg-icon">
                  <img alt="" src={stats} className="Img-fluid" />
                </div>
                <Slider className="single-item" {...settings}>
                  <div>
                    <div>
                      <h3>Hook</h3>
                      <p>{t('login.hook')}</p>
                    </div>
                  </div>
                  <div>
                    <div>
                      <h3>Features</h3>
                      <p>{t('login.features')}</p>
                    </div>
                  </div>
                  <div>
                    <div>
                      <h3>Benefits</h3>
                      <p>{t('login.benefit')}</p>
                    </div>
                  </div>
                </Slider>
              </div>
            </div>
            <div className="col-span-12 md:col-span-7 p-0 card-right order-1 md:order-2">
              <div className="card tab2-card w-full p-0 bg-white mt-12">
                <div className="p-4 md:p-8">
                  <LoginTabset />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
