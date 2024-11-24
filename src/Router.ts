// Router.ts
import DashboardScreen from "./view/DashboardScreen";
import PrimaryScreen from "./view/PrimaryScreen";
import SkillsScreen from "./view/SkillsScreen";
import UserScreen from "./view/UserScreen";
import VacancyScreen from "./view/VacancyScreen";

export default class Router {
      
    private primaryScreen: PrimaryScreen = new PrimaryScreen(this);
    private userScreen: UserScreen = new UserScreen(this);
    private dashboardScreen: DashboardScreen = new DashboardScreen(this);
    private skillsScreen: SkillsScreen = new SkillsScreen(this);
    private vacancyScreen: VacancyScreen = new VacancyScreen(this);
        
    constructor() {
        this.primaryScreen = new PrimaryScreen(this);
        this.userScreen = new UserScreen(this);
        this.dashboardScreen = new DashboardScreen(this);
        this.skillsScreen = new SkillsScreen(this);
        this.vacancyScreen = new VacancyScreen(this);
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

    // Método para navegar para LoginUser
    public navigateToLoginUser(): void {
        this.userScreen.loginUser();
    }

    // Método para navegador para a tela de Dashboard Developer
    public navigateToDashboardDeveloper(): void {
        this.dashboardScreen.dashboardDeveloper();
    }

    // Método para navegador para a tela de Dashboard Enterprise
    public navigateToDashboardEnterprise(): void {
        this.dashboardScreen.dashboardEnterprise();
    }

    // Método para navegador para a tela Skills Developer
    public navigateToSkillsScreen(){
        this.skillsScreen.skillsDeveloper();
    }

    // Método para navegador para a tela Vacancy Developer
    public navigateToVacancyScreenDeveloper(){
        this.vacancyScreen.vacancyDeveloper();
    }

    // Método para navegador para a tela Vacancy Enterprise
    public navigateToVacancyScreenEnterprise(){
        this.vacancyScreen.vacancyEnterprise();
    }
}