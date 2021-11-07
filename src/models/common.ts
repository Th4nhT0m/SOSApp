export interface ListResponse<T> {
    results: T[];
    page?: number;
    limit?: number;
    totalPages: number;
    totalResults: number;
}

export interface ListParams {
    page?: number;
    limit?: number;
    totalPages: number;
    totalResults: number;
}
