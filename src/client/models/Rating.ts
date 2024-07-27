/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BrewingMethod } from "./BrewingMethod";

/**
 * Describes one rating
 */
export type Rating = {
  /**
   * The id of the rating
   */
  _id: string;
  /**
   * Brewing method
   */
  brewing_method: BrewingMethod;
  /**
   * Ratings for coffee
   */
  rating: number;
  /**
   * The id of the coffee
   */
  coffee_id: string;
  /**
   * The id of the user created the rating
   */
  user_id: string;
  /**
   * Name of the user created the rating
   */
  user_name: string;
  /**
   * Whether rating was submitted with or without a picture
   */
  image_exists?: boolean;
};
