/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BrewingMethod } from "./BrewingMethod";
import type { Coordinate } from "./Coordinate";

/**
 * Describes the request body for creating a drink
 *
 * We get the user id and name from the JWT token.
 */
export type CreateDrink = {
  /**
   * The id of the drink
   */
  _id: string;
  /**
   * Brewing method
   */
  brewing_method?: BrewingMethod | null;
  /**
   * Rating of the drink
   */
  rating: number;
  /**
   * If the drink is made from a specific coffee bean, this is the id of the coffee bean
   */
  coffee_bean_id?: string | null;
  /**
   * Whether drink was submitted with or without a picture
   */
  image_exists?: boolean | null;
  /**
   * Location where the drink was consumed
   */
  coordinate?: Coordinate | any[] | string | null;
};
