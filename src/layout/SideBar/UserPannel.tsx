import { useAuth } from '@/hooks/auth';

import man from '@/assets/images/dashboard/man.png';

const UserPanel = (): JSX.Element => {
  const { user } = useAuth();
  return (
    <div className='flex justify-center'>
      <div className="sidebar-user text-center w-full">
        <div className='flex justify-center'>
          <img className="img-60 rounded-full lazyloaded blur-up" src={man} alt="#" />
        </div>
        <h6 className="mt-3 f-14">{user?.user.name}</h6>
        <p>general manager.</p>
      </div>
    </div>
  );
};

export default UserPanel;
