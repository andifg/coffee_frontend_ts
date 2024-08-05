/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class CoffeeDrinksService {
  /**
   *  Delete Coffee Drink By Id
   * Delete coffee drink by id
   * @param coffeeDrinkId
   * @returns any Successful Response
   * @throws ApiError
   */
  public static deleteCoffeeDrinkByIdApiV1CoffeeDrinksCoffeeDrinkIdDelete(
    coffeeDrinkId: string,
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/api/v1/coffee_drinks/{coffee_drink_id}",
      path: {
        coffee_drink_id: coffeeDrinkId,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }
}
