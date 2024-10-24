/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BrewingMethod } from "./BrewingMethod";
import type { Coordinate } from "./Coordinate";

/**
 * Describes one rating
 */
export type Drink = {
  /**
   * The id of the drink
   */
  _id: string;
  /**
   * If drink is a coffee, this field describes the brewing method
   */
  brewing_method?: BrewingMethod | null;
  /**
   * Rating of the drink
   */
  rating: number;
  /**
   * If the drink is made from a specific coffee bean this is the id of the coffee bean
   */
  coffee_bean_id?: string | null;
  /**
   * The id of the user created the drink
   */
  user_id: string;
  /**
   * Name of the user created the drink
   */
  user_name: string;
  /**
   * Whether drink was submitted with or without a picture
   */
  image_exists?: boolean | null;
  /**
   * Name of the coffee bean
   */
  coffee_bean_name?: string | null;
  /**
   * Name of the roasting company
   */
  coffee_bean_roasting_company?: string | null;
  /**
   * Location where the drink was consumed
   */
  coordinate?: Coordinate | null;
};
