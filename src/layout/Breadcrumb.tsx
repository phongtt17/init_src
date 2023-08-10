import { Home } from 'react-feather';
import { Link } from 'react-router-dom';

import { Breadcrumb } from 'flowbite-react';

const Breadcrumbs = ({ title, parent }: { title: string; parent: string }): JSX.Element => {
  return (
    <Breadcrumb
      aria-label="Solid background breadcrumb example"
      className="bg-gray-50 py-3 px-5 dark:bg-gray-900 float-right sm:float-right sm:inline-block"
    >
      <Breadcrumb.Item href="#">
        <Link to="/">
          <Home />
        </Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>{parent}</Breadcrumb.Item>
      <Breadcrumb.Item>{title}</Breadcrumb.Item>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
