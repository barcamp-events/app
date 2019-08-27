import moment from 'moment';

/**
 * Returns a function for detecting if a date is before or after
 */
export function dateBeforeAfterValidator(value?: any) {
    const start = moment(value[0]);
    const end = moment(value[1]);
    return end.isSameOrAfter(start);
};
