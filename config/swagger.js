const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Ecommerce Discount Store API",
      version: "1.0.0",
      description: "API documentation for Cart, Checkout, and Admin discount system"
    },
    servers: [
      { url: "http://localhost:3000" }
    ],

    components: {
      securitySchemes: {
        UserHeader: {
          type: "apiKey",
          in: "header",
          name: "X-User-Id"
        }
      }
    },

    security: [
      {
        UserHeader: []
      }
    ]
  },

  apis: ["./routes/*.js"] // Path to route files for annotations
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app) {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("Swagger UI available at http://localhost:3000/docs");
}

module.exports = swaggerDocs;
