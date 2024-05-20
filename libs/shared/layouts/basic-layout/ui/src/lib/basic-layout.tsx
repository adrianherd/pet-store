import styles from './basic-layout.module.scss';

/* eslint-disable-next-line */
export interface BasicLayoutProps {}

export function BasicLayout(props: BasicLayoutProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to BasicLayout!</h1>
    </div>
  );
}

export default BasicLayout;
