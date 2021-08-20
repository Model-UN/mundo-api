import { IsPhoneNumber } from 'class-validator';

/**
 * Small utility function to check if a postal code is in a valid format.
 *
 * Acceptable formats:
 * - ZIP Code (US/MX) - #####
 * - ZIP code - #####-####
 * - CA Zip Code -A#A#A# - with only certain permissible letters.
 *
 * @param code
 */
export function is_zip_code(code: string): boolean {
  const regex_us = /^(?!\a)\b\d{5}(?:-\d{4})?\b$/;
  const regex_ca =
    /^\s*[a-ceghj-npr-tvxy]\d[a-ceghj-npr-tv-z](\s)?\d[a-ceghj-npr-tv-z]\d\s*$/;
  return regex_us.test(code) || regex_ca.test(code);
}
