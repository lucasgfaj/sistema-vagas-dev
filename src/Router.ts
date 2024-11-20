import PrimaryScreen from "./view/PrimaryScreen";


export default class Router {
    private primaryScreen: PrimaryScreen = new PrimaryScreen(this);

    public constructor(){
        this.primaryScreen.getFirstScreen();
    }
}