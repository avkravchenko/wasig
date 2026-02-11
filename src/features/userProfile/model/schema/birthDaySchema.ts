import { z } from 'zod';
import { differenceInYears, isBefore, isValid, parse } from 'date-fns';

export const birthdayStringSchema = z.string()
  .min(10, "Введите полную дату (дд.мм.гггг)")
  .refine((dateStr) => {
    const parsed = parse(dateStr, 'dd.MM.yyyy', new Date());
    if (!isValid(parsed)) return false;
    if (!isBefore(parsed, new Date())) return false;
    
    const age = differenceInYears(new Date(), parsed);
    return age >= 18 && age <= 100;
  }, {
    message: "Некорректная дата. Проверьте формат и возраст (18-100 лет)" 
  });


