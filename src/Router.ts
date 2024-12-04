// Router.ts
import DeveloperScreen from "./view/DeveloperScreen";
import EnterpriseScreen from "./view/EnterpriseScreen";
import PrimaryScreen from "./view/PrimaryScreen";
import UserScreen from "./view/UserScreen";

export default class Router {
      
    private primaryScreen: PrimaryScreen = new PrimaryScreen(this);
    private userScreen: UserScreen = new UserScreen(this);
    private developerScreen: DeveloperScreen = new DeveloperScreen(this);
    private enterpriseScreen: EnterpriseScreen = new EnterpriseScreen(this);
    

    constructor() {
        this.primaryScreen = new PrimaryScreen(this);
        this.userScreen = new UserScreen(this);
        this.developerScreen = new DeveloperScreen(this);
        this.enterpriseScreen = new EnterpriseScreen(this);
        //PrimaryScreen
        this.navigateToPrimaryScreen();
    }

    // Método para navegar para a tela FirstScreen
    public navigateToPrimaryScreen(): void {
        this.primaryScreen.getFirstScreen();
    }

    // Método para navegar para a tela RegisterUser
    public navigateToRegisterUser(): void {
        this.userScreen.registerUser();
    }

    // Método para navegar para RegisterDeveloper 

     public navigateToRegisterDevelop(): void {
        this.developerScreen.registerDeveloper();
    }

    // Método para navegar para RegisterEnterprise

    public navigateToRegisterEnterprise(): void {
        this.enterpriseScreen.registerEnterprise();
    }

    // Método para navegar para LoginUser
    public navigateToLoginUser(): void {
        this.userScreen.loginUser();
    }

    // Método para navegar para ListAllUsers

    public navigateToListAllUsers(): void {
        this.userScreen.listAllUsers();
    }

    //
    public navigateToDashboard(userId: number, userType: string): void {
        if (userType === "empresa") {
            this.navigateToDashboardEnterprise(userId);
        } else if (userType === "desenvolvedor") {
            this.navigateToDashboardDeveloper(userId);
        }
    }

    // Método para navegador para a tela de Dashboard Developer
    public navigateToDashboardDeveloper(userId: number): void {
        this.developerScreen.dashboardDeveloper(userId);
    }

    // Método para navegador para a tela de Dashboard Enterprise
    public navigateToDashboardEnterprise(userId: number): void {
        this.enterpriseScreen.dashboardEnterprise(userId);
    }
    // Método para navegador para a tela Skills Developer
    public navigateToSkillsScreen(userId: number): void{
        this.developerScreen.skillsDeveloper(userId);
    }

    // Método para navegador para a tela Vacancy Developer
    public navigateToVacancyScreenDeveloper(userId: number): void{
        this.developerScreen.vacancyDeveloper(userId);
    }

    // Método para navegador para a tela Vacancy Enterprise
    public navigateToVacancyScreenEnterprise(userId: number): void{
        this.enterpriseScreen.vacancyEnterprise(userId);
    }
}