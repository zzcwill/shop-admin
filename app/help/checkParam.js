let getAllParams = (req) => {
	return {
		body: req.body,
		query: req.query,
		headers: req.headers
	}
}

let getRuleDataArr = (ruleData) => {
	let ruleArr = []

	for (const key in ruleData) {
		ruleArr[key] = ruleData[key]
	}

	return ruleArr
}

let check = async (req, ruleData) => {
	let errorMsg = '';
	let initParams = getAllParams(req);
	let initRuleArr = getRuleDataArr(ruleData);
	console.info(initParams)
	console.info(initRuleArr)

	return errorMsg

}

module.exports = {
	check
}