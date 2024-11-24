// Router.ts
import DashbordScreen from "./view/DashbordScreen";
import PrimaryScreen from "./view/PrimaryScreen";
import UserScreen from "./view/UserScreen";

export default class Router {
    navigateToDashboardScreen() {
        throw new Error("Method not implemented.");
    }
    private primaryScreen: PrimaryScreen = new PrimaryScreen(this);
    private userScreen: UserScreen = new UserScreen(this);
    private dashboardScreen: DashbordScreen = new DashbordScreen(this);

    constructor() {
        this.primaryScreen = new PrimaryScreen(this);
        this.userScreen = new UserScreen(this);
        this.dashboardScreen = new DashbordScreen(this);
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
}