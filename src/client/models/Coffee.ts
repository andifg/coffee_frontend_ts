/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Describes a Coffee type
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
   * Name of the roasting company
   */
  roasting_company: string;
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
  rating_count?: number | null;
  /**
   * The average rating for the coffee
   */
  rating_average?: number | null;
};
