/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateDrink } from "../models/CreateDrink";
import type { Drink } from "../models/Drink";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class DrinksService {
  /**
   *  List Drinks
   * Get list of all drinks
   * @param page Page number
   * @param pageSize Page size
   * @param firstDrinkId
   * @param coffeeId
   * @returns Drink Successful Response
   * @throws ApiError
   */
  public static listDrinksApiV1DrinksGet(
    page: number = 1,
    pageSize: number = 5,
    firstDrinkId?: string | null,
    coffeeId?: string | null,
  ): CancelablePromise<Array<Drink>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/drinks",
      query: {
        page: page,
        page_size: pageSize,
        first_drink_id: firstDrinkId,
        coffee_id: coffeeId,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   *  Create Drink
   * Create new drink
   * @param requestBody
   * @returns Drink Successful Response
   * @throws ApiError
   */
  public static createDrinkApiV1DrinksPost(
    requestBody: CreateDrink,
  ): CancelablePromise<Drink> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/drinks",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   *  Delete Coffee Drink By Id
   * Delete coffee drink by id
   * @param coffeeDrinkId
   * @returns any Successful Response
   * @throws ApiError
   */
  public static deleteCoffeeDrinkByIdApiV1DrinksCoffeeDrinkIdDelete(
    coffeeDrinkId: string,
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/api/v1/drinks/{coffee_drink_id}",
      path: {
        coffee_drink_id: coffeeDrinkId,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }
}
