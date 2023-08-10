import { Fragment } from 'react';

const Language = (): JSX.Element => {
  const listLanguage = [
    { name: 'English', icon: 'flag-icon-is' },
    { name: 'Spanish', icon: 'flag-icon-um' },
    { name: 'Portuguese', icon: 'flag-icon-uy' },
    { name: 'French', icon: 'flag-icon-nz' },
  ];
  return (
    <Fragment>
      <ul className="language-dropdown onhover-show-div p-20">
        {listLanguage.map(({ name, icon }) => (
          <li key={name}>
            <a href="" data-lng="en">
              <i className={`flag-icon ${icon}`}></i> {name}
            </a>
          </li>
        ))}
      </ul>
    </Fragment>
  );
};

export default Language;
