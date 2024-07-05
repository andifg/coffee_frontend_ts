/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateRating } from "../models/CreateRating";
import type { Rating } from "../models/Rating";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class RatingsService {
  /**
   *  List Ratings
   * Get list of all ratings
   * @returns Rating Successful Response
   * @throws ApiError
   */
  public static listRatingsApiV1RatingsGet(): CancelablePromise<Array<Rating>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/ratings",
    });
  }

  /**
   *  Delete Rating
   * Get list of all ratings
   * @param ratingId
   * @param coffeeId
   * @returns any Successful Response
   * @throws ApiError
   */
  public static deleteRatingApiV1CoffeesCoffeeIdRatingsRatingIdDelete(
    ratingId: string,
    coffeeId: string,
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/api/v1/coffees/{coffee_id}/ratings/{rating_id}",
      path: {
        rating_id: ratingId,
        coffee_id: coffeeId,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   *  Create Coffee Rating
   * Get list of all ratings
   * @param requestBody
   * @returns Rating Successful Response
   * @throws ApiError
   */
  public static createCoffeeRatingApiV1CoffeesCoffeeIdRatingsPost(
    requestBody: CreateRating,
  ): CancelablePromise<Rating> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/coffees/{coffee_id}/ratings",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    });
  }
}
