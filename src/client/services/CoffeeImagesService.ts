/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body__create_image_api_v1_coffees__coffee_id__image_post } from "../models/Body__create_image_api_v1_coffees__coffee_id__image_post";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class CoffeeImagesService {
  /**
   *  Get Image
   * Retrieve a coffee image from the S3 bucket associated with a coffee.
   *
   * Args:
   * coffee_id (UUID): The ID of the coffee associated with the image.
   *
   * Returns:
   * Response: A response containing the coffee image.
   *
   * Raises:
   * HTTPException: If the coffee image is not found in the S3 bucket.
   * @param coffeeId
   * @returns any <img src="https://placebear.com/cache/395-205.jpg" alt="bear">
   * @throws ApiError
   */
  public static getImageApiV1CoffeesCoffeeIdImageGet(
    coffeeId: string,
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/v1/coffees/{coffee_id}/image",
      path: {
        coffee_id: coffeeId,
      },
      errors: {
        404: `Coffee image not found`,
        422: `Validation Error`,
      },
    });
  }

  /**
   *  Create Image
   * Upload a coffee image to the S3 bucket associated with a coffee.
   *
   * Args:
   * coffee_id (UUID): The ID of the coffee associated with the image.
   * file (UploadFile): The image file to upload.
   *
   * Returns:
   * Response: A response indicating a successful upload (status code 201).
   *
   * Raises:
   * HTTPException: If no file name is provided in the uploaded file.
   * @param coffeeId
   * @param formData
   * @returns any Successful Response
   * @throws ApiError
   */
  public static createImageApiV1CoffeesCoffeeIdImagePost(
    coffeeId: string,
    formData: Body__create_image_api_v1_coffees__coffee_id__image_post,
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/v1/coffees/{coffee_id}/image",
      path: {
        coffee_id: coffeeId,
      },
      formData: formData,
      mediaType: "multipart/form-data",
      errors: {
        422: `Validation Error`,
      },
    });
  }
}
