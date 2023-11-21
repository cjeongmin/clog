export default interface MarkDownFile {
  name: string;
  content: string;
  date: string;
  publish: boolean;
  tags: string[];
}

export const DateValue = {
  NoDate: "...",
} as const;

export type DateValue = (typeof DateValue)[keyof typeof DateValue];
