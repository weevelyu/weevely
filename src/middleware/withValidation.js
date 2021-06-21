export default function withValidation(schema, handler) {
	return async (req, res) => {
		if (["POST", "PATCH"].includes(req.method)) {
			try {
				req.body = await schema.camelCase().validate(req.body, {
					stripUnknown: true,
					abortEarly: false,
				})
			} catch (e) {
				return res.status(400).json(e)
			}
		}
		await handler(req, res)
	}
}
