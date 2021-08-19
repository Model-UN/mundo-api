import {
  Body,
  Controller,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
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
      register,
    );
  }
}
