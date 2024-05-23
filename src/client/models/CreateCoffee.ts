/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Describes the create schema for a Coffee.
 *
 * As we get the owner id and name from the JWT token,
 * we only need the name of the coffee and the uuid.
 */
export type CreateCoffee = {
  /**
   * The id of the coffee
   */
  _id: string;
  /**
   * Name of coffee
   */
  name: string;
};
