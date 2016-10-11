module.exports.promiseOrCallback = function(callback, impl) {
    if(typeof callback == 'function') {
        var reject = callback;
        var resolve = function(val) {
            callback(null, val);
        };

        return impl(resolve, reject);
    } else {
        return new Promise(impl);
    }
};
