export function errorResponse(response, err) {
    return response.json({
        success: false,
        err
    });
}

export function successResponse(response, data) {
    return response.json({
        success: true,
        data: data
    });
}
