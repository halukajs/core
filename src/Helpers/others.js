// ucfirst

/* istanbul ignore next */
global.ucfirst = 
function (str) {
	return (str.charAt(0).toUpperCase() + str.slice(1))
}

// dd (Dump & Die)
/* istanbul ignore next */
global.dd = 
function (...args) {
	console.log(...args)
	process.exit(1)
}