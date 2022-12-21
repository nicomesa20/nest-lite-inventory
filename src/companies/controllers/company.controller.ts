import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, ValidationPipe } from "@nestjs/common"
import { Roles } from "src/auth/decorators/roles.decorator";
import { JwtAuthGuard } from "src/auth/guards";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { Role } from "src/auth/models/role.enum";
import { CreateCompanyDto, EditCompanyDto } from "src/dto";
import { CompanyService } from "../services/company.service";

@Controller('company')
export class CompanyController {
    constructor(private companyService: CompanyService) { }

    @Post('create-company')
    @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    public async createCompany(@Body(new ValidationPipe()) createCompany: CreateCompanyDto) {
        return this.companyService.create(createCompany);
    }

    @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put('edit-company')
    public async editCompany(@Body(new ValidationPipe()) editCompany: EditCompanyDto) {
        return this.companyService.update(editCompany);
    }

    @Roles(Role.Admin, Role.External)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('list-companies')
    public async listCompanies() {
        return this.companyService.findAll();
    }

    @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete('remove-company/:companyId')
    public async deleteCompany(@Param('companyId') companyId: string) {
        return this.companyService.delete(companyId);
    }
}