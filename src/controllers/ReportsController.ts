import { jsPDF } from 'jspdf';
import fs from 'fs';
import path from 'path';
import Database from "../database/Database";
import { TypeUser } from '../enums/TypeUser';
import User from '../models/User';
import Developer from '../models/Developer';
import Enterprise from '../models/Enterprise';
import Vacancy from '../models/Vacancy';
export default class ReportsController {
    private reportsDir = path.resolve(__dirname, "../../Reports");
    private db = Database.getInstance();

    constructor() {
        if (!fs.existsSync(this.reportsDir)) {
            fs.mkdirSync(this.reportsDir, { recursive: true });
        }
    }
    public generateAllUsersReport(): void {
        const outputPath = path.join(this.reportsDir, "AllUsersReport.pdf");
        const users = this.db.getUsers();  
        const doc = new jsPDF();
        
        doc.setFontSize(18);
        doc.text('Relatório de Todos os Usuários', 20, 20);
        doc.setFontSize(12);
        
        let verticalPosition = 30;
        const lineSpacing = 10;
        
        users.forEach((user, index) => {
            if (verticalPosition + lineSpacing * 4 > doc.internal.pageSize.height) {
                doc.addPage();
                verticalPosition = 20; 
            }
    
            doc.text(`${index + 1}. Nome: ${user.getName()}`, 20, verticalPosition);
            verticalPosition += lineSpacing;
    
            doc.text(`   Email: ${user.getEmail()}`, 20, verticalPosition);
            verticalPosition += lineSpacing;
    
            doc.text(`   Tipo: ${user.getTypeUser()}`, 20, verticalPosition);
            verticalPosition += lineSpacing;
    
            doc.text(`   Criado em: ${user.getCreatedAt().toLocaleString()}`, 20, verticalPosition);
            verticalPosition += lineSpacing * 2; // Espaço extra entre os usuários
        });
    
        const pdfBuffer = Buffer.from(doc.output('arraybuffer'));
        fs.writeFileSync(outputPath, pdfBuffer); // Salvando como PDF
    
        console.log(`Relatório de Todos os Usuários gerado e salvo em: ${outputPath}`);
    }

    // Relatório de todas as vagas
    public generateAllVacanciesReport(): void {
        const outputPath = path.join(this.reportsDir, "AllVacanciesReport.pdf");
        const vacancies = this.db.getVacancies();  // Buscando todas as vagas do banco
        
        const doc = new jsPDF();
        
        doc.setFontSize(18);
        doc.text('Relatório de Todas as Vagas', 20, 20);
        doc.setFontSize(12);
        
        vacancies.forEach((vacancy, index) => {
            doc.text(`${index + 1}. Título: ${vacancy.getTitle()}`, 20, 30 + index * 10);
            doc.text(`   Descrição: ${vacancy.getDescription()}`, 20, 35 + index * 10);
            doc.text(`   Empresa ID: ${vacancy.getEnterpriseId()}`, 20, 40 + index * 10);
        });

        // Conversão para Buffer antes de salvar
        const pdfBuffer = Buffer.from(doc.output('arraybuffer'));
        fs.writeFileSync(outputPath, pdfBuffer); // Salvando como PDF

        console.log(`Relatório de Todas as Vagas gerado e salvo em: ${outputPath}`);
    }

    // Relatório de desenvolvedores
    public generateDevelopersReport(): void {
        const outputPath = path.join(this.reportsDir, "DevelopersReport.pdf");
        const developers = this.db.getUsersByType("desenvolvedor");  // Buscando todos os desenvolvedores
        
        const doc = new jsPDF();
        
        doc.setFontSize(18);
        doc.text('Relatório de Usuários - Desenvolvedores', 20, 20);
        doc.setFontSize(12);
        
        developers.forEach((dev, index) => {
            doc.text(`${index + 1}. Nome: ${dev.getName()}`, 20, 30 + index * 10);
            doc.text(`   Email: ${dev.getEmail()}`, 20, 35 + index * 10);
            doc.text(`   Criado em: ${dev.getCreatedAt().toLocaleString()}`, 20, 40 + index * 10);
        });

        // Conversão para Buffer antes de salvar
        const pdfBuffer = Buffer.from(doc.output('arraybuffer'));
        fs.writeFileSync(outputPath, pdfBuffer); // Salvando como PDF

        console.log(`Relatório de Desenvolvedores gerado e salvo em: ${outputPath}`);
    }

    // Relatório de empresas
    public generateEnterprisesReport(): void {
        const outputPath = path.join(this.reportsDir, "EnterprisesReport.pdf");
        const enterprises = this.db.getUsersByType("empresa");  // Buscando todas as empresas
        
        const doc = new jsPDF();
        
        doc.setFontSize(18);
        doc.text('Relatório de Usuários - Empresas', 20, 20);
        doc.setFontSize(12);
        
        enterprises.forEach((enterprise, index) => {
            doc.text(`${index + 1}. Nome: ${enterprise.getName()}`, 20, 30 + index * 10);
            doc.text(`   Email: ${enterprise.getEmail()}`, 20, 35 + index * 10);
            doc.text(`   Criado em: ${enterprise.getCreatedAt().toLocaleString()}`, 20, 40 + index * 10);
        });

        // Conversão para Buffer antes de salvar
        const pdfBuffer = Buffer.from(doc.output('arraybuffer'));
        fs.writeFileSync(outputPath, pdfBuffer); // Salvando como PDF

        console.log(`Relatório de Empresas gerado e salvo em: ${outputPath}`);
    }
    public generateSpecificReport(id: number, entityType: "desenvolvedor" | "empresa" | "vaga"): void {
        let entity: User | Vacancy | undefined;
        let reportName: string;
    
        if (entityType === "desenvolvedor" || entityType === "empresa") {
            entity = this.db.getAny<User>(id); 
            reportName = "UserReport";
        } else if (entityType === "vaga") {
            entity = this.db.getAny<Vacancy>(id);
            reportName = "VacancyReport";
        } else {
            console.log("Tipo inválido. Use 'desenvolvedor', 'empresa' ou 'vaga'.");
            return;
        }
    
        if (!entity) {
            console.log(`Nenhuma ${entityType} encontrada com ID ${id}.`);
            return;
        }
    
        // Criando o relatório PDF
        const outputPath = path.join(this.reportsDir, `${reportName}_${id}.pdf`);
        const doc = new jsPDF();
    
        doc.setFontSize(18);
        doc.text(`Relatório de ${entityType}`, 20, 20);
        doc.setFontSize(12);
        doc.text(`ID: ${id}`, 20, 30);
    
        if (entity instanceof User) {
            doc.text(`Nome: ${entity.getName()}`, 20, 40);
            doc.text(`Email: ${entity.getEmail()}`, 20, 50);
            doc.text(`Tipo: ${entity.getTypeUser()}`, 20, 60);
            doc.text(`Criado em: ${entity.getCreatedAt().toLocaleString()}`, 20, 70);
        } else if (entity instanceof Vacancy) {
            doc.text(`Título: ${entity.getTitle()}`, 20, 40);
            doc.text(`Descrição: ${entity.getDescription()}`, 20, 50);
            doc.text(`Linguagem: ${entity.getLanguage()}`, 20, 60);
            doc.text(`Empresa ID: ${entity.getEnterpriseId()}`, 20, 70);
            doc.text(`Candidatos: ${entity.getCandidates().length}`, 20, 80);
        }
    
        // Salvar o relatório em PDF
        const pdfBuffer = Buffer.from(doc.output("arraybuffer"));
        fs.writeFileSync(outputPath, pdfBuffer);
    
        console.log(`Relatório de ${entityType} gerado e salvo em: ${outputPath}`);
    }
    
}