import styles from './basic-layout.module.scss';
import { Outlet } from 'react-router-dom';
import Container from '@mui/material/Container';

export function BasicLayout() {
  return (
    <Container className={styles.container} maxWidth={'lg'}>
      <Outlet/>
    </Container>
  );
}

export default BasicLayout;
