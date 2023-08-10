export type RouteConfig = {
  exact?: boolean;
  path: string;
  guard?: React.ElementType;
  layout?: (props: { children: React.ReactNode }) => JSX.Element;
  // eslint-disable-next-line
  component: ((props: any) => JSX.Element) | React.LazyExoticComponent<(props: any) => JSX.Element>;
  routes?: RouteConfig[];
};