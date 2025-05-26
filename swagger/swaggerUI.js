const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swaggerConfig");

const setupSwaggerDocs = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwaggerDocs;