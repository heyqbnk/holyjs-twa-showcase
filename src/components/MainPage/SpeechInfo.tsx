import {memo} from 'react';

import {Person} from '../Person';

import {extractTime} from '../../tools/date.ts';
import {getActivityTitle} from '../../tools/misc.ts';

import {SpeechActivity} from './types.ts';

import styles from './SpeechInfo.module.scss';

interface Props {
  speech: SpeechActivity;
}

export const SpeechInfo = memo<Props>(props => {
  const {
    speech: {
      originData: {
        speech: {
          fullDescription,
          title,
          trackTitle,
          topics,
          language,
          endAt,
          startAt,
          speakers,
          experts,
          type,
        }
      }
    },
  } = props;

  const typeTitle = getActivityTitle(type);

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.timeline}>
          {extractTime(new Date(startAt))} - {extractTime(new Date(endAt))}
        </div>
        <div className={styles.room}>{trackTitle.ru}</div>
      </div>
      {typeTitle &&
        <div className={styles.activityType}>
          {typeTitle}
        </div>}
      <div className={styles.title}>{title.ru}</div>
      <div
        className={styles.description}
        dangerouslySetInnerHTML={{__html: fullDescription.ru}}
      />
      <div className={styles.footer}>
        <div className={styles.chips}>
          <div className={styles.chip}>{language}</div>
        </div>
        {topics.length > 0 && (
          <div className={styles.topics}>
            {topics.map((t, idx) => (
              <div className={styles.topic} key={idx}>
                {t}
              </div>
            ))}
          </div>
        )}
      </div>

      {speakers.length > 0 &&
      <div className={styles.people}>
        <div className={styles.peopleTitle}>Спикеры</div>
        {speakers.map((s, idx) => (
          <Person
            className={styles.peopleItem}
            key={idx}
            photoUrl={s.photoUrl}
            name={s.name.ru}
            company={s.companyName.ru}
          />
        ))}
      </div>}

      {experts.length > 0 &&
        <div className={styles.people}>
          <div className={styles.peopleTitle}>Эксперты</div>
          {experts.map((s, idx) => (
            <Person
              className={styles.peopleItem}
              key={idx}
              photoUrl={s.photoUrl}
              name={s.name.ru}
              company={s.companyName.ru}
            />
          ))}
        </div>}
    </div>
  );
});