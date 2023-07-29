/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Rating } from "./Rating";

/**
 * Describes a Coffee
 */
export type Coffee = {
  /**
   * The id of the coffee
   */
  _id: string;
  /**
   * Name of coffee
   */
  name: string;
  /**
   * Ratings asociated with coffee
   */
  ratings?: Array<Rating>;
};
