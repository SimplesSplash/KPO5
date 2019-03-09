
import javax.swing.JTable;
import javax.swing.table.TableModel;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author Алексей
 */
public class Controller {

    View view;
    Model model;

    Controller(View v, Model m) {
        this.model = m;
        this.view = v;
        model.subscribe(this);
        view.controller = this;
    }

    public void startGame(JTable jTable1) throws InterruptedException {
        int[][] mas;
        TableModel mod=jTable1.getModel();
        mas=new int[mod.getRowCount()][mod.getColumnCount()];
        for(int i=0;i<mod.getRowCount();i++){
            for(int j=0;j<mod.getColumnCount();j++){
                
                mas[i][j]=Integer.parseInt((String) mod.getValueAt(i, i));
                
            }
        }
        
        model.gameProcess(mas);

    }

    public void stopGame() {
        System.out.println("Заглушка из метода stopGame");
        model.stopped = true;

    }

    public void showRules() {
        model.showRules();
    }

    public void update(int[][] field){

        view.update(field);

    }

}
