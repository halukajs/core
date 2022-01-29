"use strict";
// ucfirst
/* istanbul ignore next */
global.ucfirst =
    function (str) {
        return (str.charAt(0).toUpperCase() + str.slice(1));
    };
// dd (Dump & Die)
/* istanbul ignore next */
global.dd =
    function () {
        console.log(...arguments);
        process.exit(1);
    };
//# sourceMappingURL=others.js.map