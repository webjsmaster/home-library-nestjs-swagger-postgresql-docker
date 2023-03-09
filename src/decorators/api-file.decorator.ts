import { applyDecorators, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiConsumes } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";

export function ApiFile() {
  return applyDecorators(
    UseInterceptors(FileInterceptor("poster")),
    ApiBearerAuth("JWT-auth"),
    ApiConsumes("multipart/form-data"),
    // UsePipes(
    //   new ValidationPipe({
    //     transform: true,
    //   }),
    // ),
    // FormDataRequest(),
    ApiBody({
      schema: {
        type: "object",
        properties: {
          file: {
            type: "file",
            format: "binary",
            example: "file",
            description: "Download file",
          },
          name: {
            type: "string",
          },
          grammy: {
            type: "boolean",
          },
        },
      },
    }),
  );
}
