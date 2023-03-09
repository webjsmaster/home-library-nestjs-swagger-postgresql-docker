import { BadRequestException, PipeTransform } from "@nestjs/common";
import { ArtistDto } from "../dto/artist.dto";

export class BodyValidationPipe implements PipeTransform {
  transform(value: ArtistDto): any {
    const grammy = this.isTransformBoolean(value.grammy);

    const name = this.isTransformString(value.name);

    console.log("🚀:GRAMMY", grammy);

    console.log("🚀:NAME", name);

    if (!this.isValidate({ ...value, grammy })) {
      throw new BadRequestException("Incorrect field body");
    }

    // console.log("📌:", this.isValidate(value));

    return value;
  }

  private isValidate(value: ArtistDto) {
    console.log("🎸:", value);

    return typeof value.name === "string" && typeof value.grammy === "boolean";
  }

  private isTransformBoolean(grammy) {
    switch (grammy) {
      case typeof grammy === "boolean": {
        return grammy;
      }
      case "true": {
        return true;
      }
      case "false": {
        return false;
      }
      default: {
        throw new BadRequestException("Field 'Grammy' in not boolean");
      }
    }
  }

  private isTransformString(name) {
    console.log("📌:", parseInt(name));

    if (parseInt(name)) {
      throw new BadRequestException("Field 'Name' in not string");
    }
    return name;
  }
}
