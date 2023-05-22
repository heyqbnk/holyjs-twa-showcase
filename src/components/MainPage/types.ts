interface Localized {
  ru: string;
  en: string;
}

type Activity<T> = {
  id: string;
} & T;

type Person = {
  name: Localized;
  companyName: Localized;
  photoUrl: string;
};

export type SpeechActivity = Activity<{
  originType: 'speech';
  originData: {
    speech: {
      fullDescription: Localized;
      trackNumber: number;
      trackTitle: Localized;
      trackDescription: Localized;
      title: Localized;
      type: 'interview' | 'masterclass' | 'talk' | 'conversation' | 'bof_session' | 'workshop';
      language: string;
      topics: string[];
      startAt: string;
      speakers: Person[];
      experts: Person[];
      endAt: string;
      complexity: number;
    };
  }
}>;
type ServiceSlotActivity = Activity<{ originType: 'serviceSlot' }>;
type UnknownActivity = Activity<{ originType: string }>;

export type AnyActivity = SpeechActivity | ServiceSlotActivity | UnknownActivity;