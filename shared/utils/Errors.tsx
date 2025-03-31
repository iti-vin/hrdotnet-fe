/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

/**
 * @const countFilingsByError
 * @param filings - an array of filing objects contains the errors
 * @param hasErrors - a boolean choose between success or failed filings
 * @returns {number} Total length of the success and failed based on the boolean
 */
export const countFilingsByError = ({ filings, success }: { filings: any[]; success?: boolean }): number => {
  return filings.filter((filing) => (success ? filing.errors.length === 0 : filing.errors.length > 0)).length;
};
