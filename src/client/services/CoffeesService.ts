/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Coffee } from "../models/Coffee";
import type { CreateCoffee } from "../models/CreateCoffee";
import type { UpdateCoffee } from "../models/UpdateCoffee";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class CoffeesService {
  /**
   *  Post Coffee
   * @param requestBody
   * @returns Coffee Successful Response
   * @throws ApiError
   */
  public static postCoffeeApiV1CoffeesPost(
    requestBody: CreateCoffee,
  ): CancelablePromise<Coffee> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/coffees/",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   *  List Coffees With Rating Summary
   * Get list of coffees including rating summary
   * @param page Page number
   * @param pageSize Page size
   * @param ownerId
   * @param firstId
   * @param searchQuery
   * @returns Coffee Successful Response
   * @throws ApiError
   */
  public static listCoffeesWithRatingSummaryApiV1CoffeesGet(
    page: number = 1,
    pageSize: number = 10,
    ownerId?: string | null,
    firstId?: string | null,
    searchQuery?: string | null,
  ): CancelablePromise<Array<Coffee>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/coffees",
      query: {
        page: page,
        page_size: pageSize,
        owner_id: ownerId,
        first_id: firstId,
        search_query: searchQuery,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Endpoint to patch coffee name.
   * Patch coffee name. To patch ratings use rating endpoints
   * @param coffeeId
   * @param requestBody
   * @returns Coffee Successful Response
   * @throws ApiError
   */
  public static patchCoffeeApiV1CoffeesCoffeeIdPatch(
    coffeeId: string,
    requestBody: UpdateCoffee,
  ): CancelablePromise<Coffee> {
    return __request(OpenAPI, {
      method: "PATCH",
      url: "/api/v1/coffees/{coffee_id}",
      path: {
        coffee_id: coffeeId,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   *  Get Coffee By Id
   * Get coffee by id
   * @param coffeeId
   * @returns Coffee Successful Response
   * @throws ApiError
   */
  public static getCoffeeByIdApiV1CoffeesCoffeeIdGet(
    coffeeId: string,
  ): CancelablePromise<Coffee> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/coffees/{coffee_id}",
      path: {
        coffee_id: coffeeId,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   *  Delete Coffee By Id
   * Get coffee by id
   * @param coffeeId
   * @returns any Successful Response
   * @throws ApiError
   */
  public static deleteCoffeeByIdApiV1CoffeesCoffeeIdDelete(
    coffeeId: string,
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/api/v1/coffees/{coffee_id}",
      path: {
        coffee_id: coffeeId,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   *  Patch Coffee
   * Get coffee by id
   * @param coffeeId
   * @param requestBody
   * @returns string Successful Response
   * @throws ApiError
   */
  public static patchCoffeeApiV1CoffeesIdsGet(
    coffeeId: string,
    requestBody: UpdateCoffee,
  ): CancelablePromise<Array<string>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/coffees/ids",
      query: {
        coffee_id: coffeeId,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    });
  }
}
