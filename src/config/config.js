const Joi = require("joi");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.join(__dirname, "../../.env") });

const envVarsSchema = Joi.object()
  .keys({
    PORT: Joi.number().required(),
    MONGODB_URL: Joi.string().required().description("mongodb url"),
    SECRET_KEY: Joi.string().required().description("secret key"),
    ACCESS_EXPIRATION_DAYS: Joi.number().required(),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) throw new Error(`Config validation error: ${error}`);

module.exports = {
  port: envVars.PORT,
  mongoose: {
    url: envVars.MONGODB_URL,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  jwt: {
    secret_key: envVars.SECRET_KEY,
    accessExpirationDays: envVars.ACCESS_EXPIRATION_DAYS,
  },
};
