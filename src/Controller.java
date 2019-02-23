/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author Валерия
 */
public class Controller {
    View view;
    Model model;
    Controller(View v, Model m){
        this.model=m;
        this.view=v;
    }
    public void startGame(){
        model.gameProcess();
        
    }
    public void stopGame(){
        System.out.println("Заглушка из метода stopGame");
        
    }
    public void showRules(){
        model
    }
    public void update(int[][] field){
        view.update(field);
        
    }
    
}
