import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Sapmi Riwi MediCare API",
      version: "1.0.0",
      description: "API para gestión de clínicas, almacenes, medicamentos y solicitudes de abastecimiento",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Ingresa el token JWT obtenido del login",
        },
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "accessToken",
          description: "Token JWT almacenado en cookie (se establece automáticamente al hacer login)",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["src/routes/**/*.ts"],
};

export const swaggerSpec = swaggerJSDoc(options);
