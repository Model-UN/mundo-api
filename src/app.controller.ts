import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { AppHttpResponseDto } from './dto/app-http-response.dto';

@ApiTags('meta')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Some fun metadata for the curious.' })
  @ApiResponse({ status: 200, description: 'Metadata' })
  getMetadata(): AppHttpResponseDto {
    return this.appService.metadata();
  }

  @Get('health')
  @ApiOperation({ summary: "Test a GET request to make sure we're live" })
  @ApiResponse({ status: 200, description: 'It works!' })
  getHealth(): AppHttpResponseDto {
    return this.appService.health();
  }
}
