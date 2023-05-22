import {memo, useEffect, useMemo, useState} from 'react';

import {SpeechItem} from './SpeechItem.tsx';
import {SpeechInfo} from './SpeechInfo.tsx';

import {useBridge} from '../../providers/BridgeProvider';

import {AnyActivity, SpeechActivity} from './types.ts';

import activities from './activities.ts';
import styles from './MainPage.module.scss';

function isSpeechActivity(activity: AnyActivity): activity is SpeechActivity {
  return activity.originType === 'speech';
}

export const MainPage = memo(() => {
  const [activeSpeech, setActiveSpeech] = useState<SpeechActivity | null>(null);
  const bridge = useBridge();

  // Leave only speech items with speakers.
  const speeches = useMemo(() => {
    return (activities as AnyActivity[]).reduce<SpeechActivity[]>((acc, item) => {
      if (
        isSpeechActivity(item) &&
        item.originData.speech.speakers.length > 0
      ) {
        acc.push(item);
      }
      return acc;
    }, []);
  }, []);

  // When active speech was selected or reselected
  // we have to display MainButton which will
  // create and display an invoice.
  useEffect(() => {
    if (activeSpeech === null) {
      // If active speech item was hidden, just hide the main button
      bridge.postEvent('web_app_setup_main_button', {
        is_visible: false,
      });

      return;
    }

    // Scroll to the bottom of the page.
    window.scrollTo({top: 0});

    // Configure back button.
    bridge.postEvent('web_app_setup_back_button', {
      is_visible: true,
    });

    // When BackButton was clicked by user, we
    // should hide active speech and BackButton.
    const backButtonListener = () => {
      setActiveSpeech(null);
      bridge.postEvent('web_app_setup_back_button', {
        is_visible: false,
      });
    }

    bridge.on('back_button_pressed', backButtonListener);

    // Then, let's go the MainButton configuration. First of all,
    // display it with target text and color.
    bridge.postEvent('web_app_setup_main_button', {
      text: 'Купить билет',
      is_visible: true,
      is_active: true,
      color: '#f16bdc',
    });

    // When button was clicked, imitate invoice creation.
    const mainButtonListener = () => {
      bridge.postEvent('web_app_setup_main_button', {
        text: 'Производится покупка',
        is_visible: true,
        is_progress_visible: true,
        is_active: false,
        color: '#f16bdc',
      });

      // Imitate invoice creation. An application should send
      // request to your backend API here and then,
      // we will have to call 'web_app_open_invoice' method with
      // received invoice ID.
      setTimeout(() => {
        // Here, we are assuming, that we successfully bought
        // a ticket and want to hide this button.
        bridge.postEvent('web_app_setup_main_button', {
          is_visible: true,
        });
      }, 3000);
    };

    bridge.on('main_button_pressed', mainButtonListener);

    // Don't forget to clean up.
    return () => {
      bridge.off('main_button_pressed', mainButtonListener);
      bridge.off('back_button_pressed', backButtonListener);
    };
  }, [activeSpeech]);

  return (
    <div className={styles.root}>
      {activeSpeech && <SpeechInfo speech={activeSpeech}/>}
      {!activeSpeech && speeches.map(speech => (
        <SpeechItem key={speech.id} speech={speech} onClick={setActiveSpeech}/>
      ))}
    </div>
  );
});