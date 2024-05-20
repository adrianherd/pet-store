import styles from './pet-list.module.scss';

/* eslint-disable-next-line */
export interface PetListProps {}

export function PetList(props: PetListProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to PetList!</h1>
    </div>
  );
}

export default PetList;
