import { CreateCompanyDto, EditCompanyDto } from "src/dto";
import { CompanyService } from "../services/company.service";
export declare class CompanyController {
    private companyService;
    constructor(companyService: CompanyService);
    createCompany(createCompany: CreateCompanyDto): Promise<import("../models/company.entity").Company>;
    editCompany(editCompany: EditCompanyDto): Promise<void>;
    listCompanies(): Promise<import("../models/company.entity").Company[]>;
    deleteCompany(companyId: string): Promise<void>;
}
