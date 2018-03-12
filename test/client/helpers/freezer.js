module.exports = function freeze(ob) {
    Object.freeze(ob);
    Object.getOwnPropertyNames(ob).forEach(function (prop) {
        if (ob[prop] !== null
            && (typeof ob[prop] === "object" || typeof ob[prop] === "function")
            && !Object.isFrozen(ob[prop])) {
            freeze(ob[prop]);
        }
    });

    return ob;
};