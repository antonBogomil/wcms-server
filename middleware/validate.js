export function validate(type) {
    return function (req, res, next) {
        console.log(req.body.length);
        next();
    };
}
