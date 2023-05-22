import {memo} from 'react';

import cn from 'classnames';

import styles from './Person.module.scss';

interface Props {
  photoUrl: string;
  name: string;
  company?: string | null;
  className?: string;
}

export const Person = memo<Props>(props => {
  const {company, className, name, photoUrl} = props;

  return (
    <div className={cn(styles.root, className)}>
      <img className={styles.avatar} src={photoUrl} alt={name}/>
      <div className={styles.info}>
        <div className={styles.name}>{name}</div>
        {company && <div className={styles.company}>{company}</div>}
      </div>
    </div>
  );
});