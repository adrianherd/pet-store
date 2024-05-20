import styles from './basic-layout.module.scss';
import { Outlet } from 'react-router-dom';

export function BasicLayout() {
  return (
    <div className={styles['container']}>
      <Outlet/>
    </div>
  );
}

export default BasicLayout;
