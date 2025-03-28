/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

/**
 * @const filtersToParamsQuery
 * @param {Record<string, any>} filters - An object containing query filters.
 * @returns {URLSearchParams} URLSearchParams with formatted query parameters.
 */
export const filtersToParamsQuery = (filters?: Record<string, any>): URLSearchParams => {
  const params = new URLSearchParams();

  if (!filters) return params;

  Object.entries(filters).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => params.append(key, v.toString()));
    } else if (value !== undefined && value !== null) {
      params.append(key, value.toString());
    }
  });

  return params;
};
