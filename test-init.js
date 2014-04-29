var __slice = [].slice;

_exit = process.exit;

process.exit = function() {
    var args;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return setTimeout(function() {
        return _exit.apply(process, args);
    }, 100);
};