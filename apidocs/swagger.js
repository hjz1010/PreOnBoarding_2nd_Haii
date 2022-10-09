const swaggerUi = require("swagger-ui-express")
const swaggereJsdoc = require("swagger-jsdoc")

const options = {
    swaggerDefinition: {
      openapi: "3.0.0",
      info: {
        version: "1.0.0",
        title: "프리온보딩 기업과제 2 - Haii",
        description:
          "Admin용 데이터 관리 프로그램 만들기",
      },
      servers: [
        {
          url: "http://localhost:8000" 
        },
      ],
      components : {
        securitySchemes: {   
            Authorization: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
                value: "bearer <JWT token here>"
              }
          },
      },
    },
    apis: ["./apidocs/*/*.js"] 
  }

const specs = swaggereJsdoc(options)

module.exports = { 
    swaggerUi, 
    specs 
}