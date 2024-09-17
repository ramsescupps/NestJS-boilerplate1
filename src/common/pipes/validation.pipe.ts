import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log('value:', value);

    if(value === null || value === undefined || Object.keys(value).length === 0){
      throw new BadRequestException('validation failed: No data provided');
    }

    if(typeof value.name !== 'string' || value.name.trim().length === 0){
      throw new BadRequestException('validation failed: name must be a non-empty string');
    }

    return value;
  }
}