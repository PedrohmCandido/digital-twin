import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Digital Twin API - Medicina",
      version: "1.0.0",
      description: "API para gerenciamento de pacientes, dispositivos, sinais vitais e simulações",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);

export { swaggerUi, specs };
