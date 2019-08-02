export function errorResponse(response, err) {
    return response.json({
        err
    });
}

export function successResponse(response, data) {
    return response.json({
        data: data
    });
}
