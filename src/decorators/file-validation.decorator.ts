import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from "class-validator"

interface IsFileOptions {
  mime: ("image/jpg" | "image/png" | "image/jpeg")[]
}

export function IsFile(
  options: IsFileOptions,
  validationOptions?: ValidationOptions,
) {
  console.log("🫧:", "START VALIDATION")
  return function (object: Object, propertyName: string) {
    return registerDecorator({
      name: "isFile",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (
            value?.mimetype &&
            (options?.mime ?? []).includes(value?.mimetype)
          ) {
            console.log("💥:", "VALIDATION SUCCESS")
            return true
          }
          return false
        },
      },
    })
  }
}
