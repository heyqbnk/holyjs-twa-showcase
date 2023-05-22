import {memo} from 'react';

import {Person} from '../Person';

import {extractTime} from '../../tools/date.ts';

import {SpeechActivity} from './types.ts';

import styles from './SpeechItem.module.scss';
import {getActivityTitle} from '../../tools/misc.ts';

interface SpeechItemProps {
  speech: SpeechActivity;
  onClick: (speech: SpeechActivity) => void;
}

export const SpeechItem = memo<SpeechItemProps>(({speech, onClick}) => {
  const {
    originData: {
      speech: {
        language,
        speakers: [speaker],
        startAt,
        title,
        trackTitle,
        topics,
        endAt,
        type,
      },
    }
  } = speech;

  const {name, companyName, photoUrl} = speaker;
  const startDate = extractTime(new Date(startAt));
  const endDate = extractTime(new Date(endAt));
  const typeTitle = getActivityTitle(type);

  return (
    <div className={styles.root} onClick={() => onClick(speech)}>
      <div className={styles.timeline}>
        {startDate} - {endDate}
      </div>
      <div className={styles.header}>
        {typeTitle &&
          <div className={styles.activityType}>
            {typeTitle}
          </div>}
        <div className={styles.room}>
          {trackTitle.ru}
        </div>
      </div>
      <div className={styles.title}>{title.ru}</div>
      <Person
        className={styles.speaker}
        photoUrl={photoUrl}
        name={name.ru}
        company={companyName.ru}
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
    </div>
  );
});