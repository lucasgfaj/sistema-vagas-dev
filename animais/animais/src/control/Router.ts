import Database from "../db/Database";
import PrimaryScreen from "../view/PrimayScreen";
import AnimalController from "./AnimalController";

export default class Router{

    //esta será a única instância de database do sistema
    private db: Database = new Database();
    private ps: PrimaryScreen = new PrimaryScreen(this);
    public animalCrontroller: AnimalController = new AnimalController(this.db);
    

    constructor(){
        this.ps.getFirstScreen();
    }



}