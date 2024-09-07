/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body__create_image_api_v1_drinks__drink_id__image_post } from "../models/Body__create_image_api_v1_drinks__drink_id__image_post";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class DrinkImagesService {
  /**
   *  Create Image
   * Upload a coffee drink image associated with a coffee drink.
   *
   * Args:
   * drink_id (UUID): The ID of the drink associated with the
   * image.
   * file (UploadFile): The image file to upload.
   *
   * Returns:
   * Response: A response indicating a successful upload (status code 201).
   *
   * Raises:
   * HTTPException: If no file name is provided in the uploaded file.
   * @param drinkId
   * @param formData
   * @returns any Successful Response
   * @throws ApiError
   */
  public static createImageApiV1DrinksDrinkIdImagePost(
    drinkId: string,
    formData: Body__create_image_api_v1_drinks__drink_id__image_post,
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/drinks/{drink_id}/image",
      path: {
        drink_id: drinkId,
      },
      formData: formData,
      mediaType: "multipart/form-data",
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   *  Get Image
   * Retrieve a coffee drink image associated with a coffee drink.
   *
   * Args:
   * drink_id (UUID): The ID of the drink associated with the
   * image.
   *
   * Returns:
   * Response: A response containing the coffee image.
   *
   * Raises:
   * HTTPException: If the coffee image is not found in the S3 bucket.
   * @param drinkId
   * @returns any <img src="https://placebear.com/cache/395-205.jpg" alt="bear">
   * @throws ApiError
   */
  public static getImageApiV1DrinksDrinkIdImageGet(
    drinkId: string,
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/drinks/{drink_id}/image",
      path: {
        drink_id: drinkId,
      },
      errors: {
        404: `Coffee image not found`,
        422: `Validation Error`,
      },
    });
  }
}
