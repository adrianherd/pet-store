import styles from './protected-route.module.scss';

/* eslint-disable-next-line */
export interface ProtectedRouteProps {}

export function ProtectedRoute(props: ProtectedRouteProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to ProtectedRoute!</h1>
    </div>
  );
}

export default ProtectedRoute;
