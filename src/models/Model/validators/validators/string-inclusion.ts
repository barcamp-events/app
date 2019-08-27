import { isString } from '../../core/utils/helpers/is-string';
import { toString } from '../../core/utils/helpers/to-string';

/**
 * Returns a function for detecting words that exist in a string.
 */
export function stringInclusionValidator(options: {
  seed?: string;
} = {}) {
  return (value?: any) => {

    if (!isString(value)) {
      return false;
    }

    const { seed } = options;
    return value.indexOf(toString(seed)) >= 0;
  };
}
