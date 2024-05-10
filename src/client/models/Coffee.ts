/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

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
   * The id of the owner of the coffee
   */
  owner_id: string;
  /**
   * Name of the owner of the coffee
   */
  owner_name: string;
  /**
   * The number of ratings for the coffee
   */
  rating_count?: number;
  /**
   * The average rating for the coffee
   */
  rating_average?: number;
};
