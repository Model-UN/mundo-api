import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { FormsService } from './forms.service';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('forms')
@Controller('api/conferences/:conferenceId/forms')
export class FormsController {
  constructor(private readonly formsService: FormsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'conferenceId' })
  @ApiBearerAuth()
  create(
    @Request() req,
    @Param('conferenceId') confId,
    @Body() createFormDto: CreateFormDto,
  ) {
    return this.formsService.handleFormCreation(
      req.user.id,
      +confId,
      createFormDto,
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'conferenceId' })
  @ApiBearerAuth()
  findAll(@Param('conferenceId') confId) {
    return this.formsService.findAll(+confId);
  }

  @Get(':id')
  @ApiParam({ name: 'conferenceId' })
  findOne(@Param('id') id: string) {
    return this.formsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'conferenceId' })
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateFormDto: UpdateFormDto) {
    return this.formsService.update(+id, updateFormDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'conferenceId' })
  @ApiBearerAuth()
  softDelete(@Param('id') id: string) {
    return this.formsService.softDelete(+id);
  }

  @Patch(':id/activate')
  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'conferenceId' })
  @ApiBearerAuth()
  activate(@Param('id') id: string) {
    return this.formsService.activate(+id);
  }
}
