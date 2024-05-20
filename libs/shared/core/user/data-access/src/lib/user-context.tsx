import styles from './user-context.module.scss';

/* eslint-disable-next-line */
export interface UserContextProps {}

export function UserContext(props: UserContextProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to UserContext!</h1>
    </div>
  );
}

export default UserContext;
