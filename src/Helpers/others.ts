// ucfirst
/* istanbul ignore next */
global.ucfirst = 
function (str: String): String {
    return (str.charAt(0).toUpperCase() + str.slice(1))
}

// dd (Dump & Die)
/* istanbul ignore next */
global.dd = 
function (): void {
    console.log(...arguments)
    process.exit(1)
}