import styles from './landing.module.scss';
import { Link } from 'react-router-dom';

/* eslint-disable-next-line */
export interface LandingProps {}

export function Landing() {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Landing!</h1>
      <Link to="/pet-list">Pet List</Link>
      <Link to="/login">Login</Link>
    </div>
  );
}

export default Landing;
