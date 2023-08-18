/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Coffee } from '../models/Coffee';
import type { UpdateCoffee } from '../models/UpdateCoffee';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CoffeesService {

    /**
     *  Post Coffee
     * @param requestBody
     * @returns Coffee Successful Response
     * @throws ApiError
     */
    public static postCoffeeApiV1CoffeesPost(
        requestBody: Coffee,
    ): CancelablePromise<Coffee> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/coffees/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     *  List Coffee
     * Get list of coffees
     * @returns Coffee Successful Response
     * @throws ApiError
     */
    public static listCoffeeApiV1CoffeesGet(): CancelablePromise<Array<Coffee>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/coffees',
        });
    }

    /**
     *  List Coffee Ids
     * Get coffee by id
     * @returns string Successful Response
     * @throws ApiError
     */
    public static listCoffeeIdsApiV1CoffeesIdsGet(): CancelablePromise<Array<string>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/coffees/ids',
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
            method: 'GET',
            url: '/api/v1/coffees/{coffee_id}',
            path: {
                'coffee_id': coffeeId,
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
            method: 'DELETE',
            url: '/api/v1/coffees/{coffee_id}',
            path: {
                'coffee_id': coffeeId,
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
            method: 'PATCH',
            url: '/api/v1/coffees/{coffee_id}',
            path: {
                'coffee_id': coffeeId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
