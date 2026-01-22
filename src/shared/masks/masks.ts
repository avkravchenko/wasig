export const sharedMasks: Readonly<Record<string, any>> = {
  date: [/\d/, /\d/, ".", /\d/, /\d/, ".", /\d/, /\d/, /\d/, /\d/],
} as const;
