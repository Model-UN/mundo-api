import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { SubmissionsService } from './submissions.service';
import { SubmitFormDto } from '../dto/submit-form.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@ApiTags('formSubmissions')
@Controller('api/conferences/:conferenceId/forms/:formId/submissions')
export class SubmissionsController {
  constructor(private readonly submissionsService: SubmissionsService) {}

  @Post()
  @ApiParam({ name: 'conferenceId' })
  @ApiParam({ name: 'formId' })
  submitForm(
    @Param('conferenceId') confId,
    @Param('formId') formId,
    @Query('register') register,
    @Body()
    submitFormDto: SubmitFormDto,
  ) {
    return this.submissionsService.handleSubmit(
      +confId,
      +formId,
      submitFormDto,
    );
  }

  @Get('')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiParam({ name: 'conferenceId' })
  @ApiParam({ name: 'formId' })
  getAll(@Param('conferenceId') confId, @Param('formId') formId) {
    return this.submissionsService.fetchAll(+confId, +formId);
  }

  @Get(':submissionId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiParam({ name: 'conferenceId' })
  @ApiParam({ name: 'formId' })
  @ApiParam({ name: 'submissionId' })
  @UseGuards(JwtAuthGuard)
  getOne(
    @Param('conferenceId') confId,
    @Param('formId') formId,
    @Param('submissionId') submissionId,
  ) {
    return this.submissionsService.fetchOne(+confId, +formId, +submissionId);
  }
}
