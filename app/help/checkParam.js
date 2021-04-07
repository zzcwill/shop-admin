// class Rule {
//   constructor(name, msg, ...params) {
//     Object.assign(this, {
//       name,
//       msg,
//       params
//     })
//   }

//   validate(field) {
//     if (this.name == 'isOptional')
//       return new RuleResult(true)
//     if (!validator[this.name](field + '', ...this.params)) {
//       return new RuleResult(false, this.msg || this.message || '参数错误')
//     }
//     return new RuleResult(true, '')
//   }
// }

let getAllParams = (req) => {
	console.info(req)
	return {
		body: req.body,
		query: req.query,
		path: req.params,
		header: req.header
	}
}

let check = async (req, ruleParm) => {
	var errorMsg = '';
	var initParams = getAllParams(req);

	return errorMsg

}

module.exports = {
	check
}