/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { HealthStatus } from '../models/HealthStatus';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class HealthService {

    /**
     *  Get Health
     * Returns the health status of the coffee service.
     *
     * Returns:
     * The health report.
     * @returns HealthStatus Successful Response
     * @throws ApiError
     */
    public static getHealthHealthGet(): CancelablePromise<HealthStatus> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/health',
        });
    }

}
