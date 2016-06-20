module.exports = function logger(request, response, next) {
    var start = +new Date();
    var stream = process.stdout;
    var url = request.url;
    var method = request.method;

    response.on("finish", function () {
        var dur = +new Date() - start;
        var message = method + "\nto " + url + "\ntook " + dur + "ms\n\n";
        stream.write(message);
    });

    next();
}