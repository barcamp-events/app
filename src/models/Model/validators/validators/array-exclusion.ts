import { arrayInclusionValidator } from './array-inclusion';

/**
 * Returns a function for detecting values that do not exist in the array.
 */
export function arrayExclusionValidator(options: {
  values?: any[];
} = {}) {
  return (value?: any) => {
    return !arrayInclusionValidator(options)(value);
  };
}
