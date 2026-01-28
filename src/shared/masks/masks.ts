export const sharedMasks: Readonly<Record<string, any>> = {
  date: [/\d/, /\d/, ".", /\d/, /\d/, ".", /\d/, /\d/, /\d/, /\d/],
  phone: [
    "+",
    "7",
    /[1-9]/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ],
} as const;
