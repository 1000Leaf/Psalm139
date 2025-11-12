
export interface Verse {
  ref: string;
  text: string;
}

export interface VerseSection {
  theme: string;
  verses: Verse[];
}

export type PrayerTone = '祈求' | '感恩' | '悔改';
