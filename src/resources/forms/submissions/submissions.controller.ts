import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { SubmissionsService } from './submissions.service';
import { SubmitFormDto } from '../dto/submit-form.dto';

@ApiTags('formSubmissions')
@Controller('conferences/:conferenceId/forms/:formId/submissions')
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
  @ApiParam({ name: 'conferenceId' })
  @ApiParam({ name: 'formId' })
  getAll(@Param('conferenceId') confId, @Param('formId') formId) {
    return this.submissionsService.fetchAll(+confId, +formId);
  }

  @Get(':submissionId')
  @ApiParam({ name: 'conferenceId' })
  @ApiParam({ name: 'formId' })
  @ApiParam({ name: 'submissionId' })
  getOne(
    @Param('conferenceId') confId,
    @Param('formId') formId,
    @Param('submissionId') submissionId,
  ) {
    return this.submissionsService.fetchOne(+confId, +formId, +submissionId);
  }
}
