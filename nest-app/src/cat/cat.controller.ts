import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
} from "@nestjs/common";
import { CatService } from "./cat.service";
import { CreateCatDto } from "./dto/create-cat.dto";
import { UpdateCatDto } from "./dto/update-cat.dto";
import { Cat } from "./interfaces/cat.interface";
import { ValidationPipe } from "../global/validation/validate.pipe";
import { ParseIntPipe } from "../global/validation/parse-int.pipe";
import { LoggingInterceptor } from "../global/interceptor/logging.interceptor";

@Controller("cat")
@UseInterceptors(LoggingInterceptor)
export class CatController {
  constructor(private readonly catService: CatService) {}

  @Post()
  create(@Body(new ValidationPipe()) createCatDto: CreateCatDto) {
    return this.catService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    // throw new ForbiddenException();
    return this.catService.findAll();
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: string) {
    return this.catService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateCatDto: UpdateCatDto) {
    return this.catService.update(+id, updateCatDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.catService.remove(+id);
  }
}
