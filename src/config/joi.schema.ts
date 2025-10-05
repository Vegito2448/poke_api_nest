import joi from 'joi';

export const JoiValidationSchema = joi.object({
	PORT: joi.number().default(3000),
	DEFAULT_LIMIT: joi.number().default(10),
	MONGODB_URI: joi.string().required(),
});