import { twMerge } from 'tailwind-merge';
import clsx, { type ClassValue } from 'clsx'; // Using ClassValue for TypeScript type safety

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};