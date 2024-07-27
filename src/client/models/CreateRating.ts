/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BrewingMethod } from "./BrewingMethod";

/**
 * Describes the request body for creating a rating
 *
 * We get the user id and name from the JWT token.
 */
export type CreateRating = {
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
   * Whether rating was submitted with or without a picture
   */
  image_exists?: boolean;
};
