// ucfirst

/* istanbul ignore next */
global.ucfirst = 
function (str: string): string {
	return (str.charAt(0).toUpperCase() + str.slice(1))
}

// dd (Dump & Die)
/* istanbul ignore next */
global.dd = 
function (...args: any): void {
	console.log(...args)
	process.exit(1)
}