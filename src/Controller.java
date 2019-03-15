
import java.util.List;
import javax.swing.JOptionPane;
import javax.swing.JTable;
import javax.swing.SwingWorker;
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
    Integer[][] field;

    Controller(View v) {
        this.view = v;
        view.controller = this;
    }

    public void startGame(JTable jTable1) throws InterruptedException {
        model= new Model();
         model.subscribe(this);
          model.ended=false;
          model.stopped=false;
        FlipTask task =  new FlipTask(this);
           task.execute();


    }

    public Integer[][] getDataFromTable(JTable jTable1) throws NumberFormatException {
        Integer[][] mas;
        TableModel mod=jTable1.getModel();
        mas=new Integer[mod.getRowCount()][mod.getColumnCount()];
        for(int i=0;i<mod.getRowCount();i++){
            for(int j=0;j<mod.getColumnCount();j++){
                
                mas[i][j]=Integer.parseInt((String) mod.getValueAt(i, j));
                
            }
        }
        return mas;
    }

    public void stopGame() {
        
        model.stopped = true;

    }

    public void showRules() {
        model.showRules();
    }

    public void update(Integer[][] field){

        view.update(field);

    }



public class FlipTask extends SwingWorker<Void, Integer[][]> {
           Controller c;
          
            Integer[][] field;

        public FlipTask(Controller c) {
            this.c = c;
           
        }
          @Override
        protected Void doInBackground() throws InterruptedException  {
             Model m = c.model;
             Integer[][] mas=c.getDataFromTable(c.view.getjTable1());
              m.setField(mas);
              while(!m.ended){
                   m.gameProcess(m.field);
            Thread.sleep(100);
            field=c.field;
              publish(field);
                  
           }
              JOptionPane.showMessageDialog(view,"END!");
                   return null;
              }

            @Override
        protected void process(List<Integer[][]> fields) {
            Integer[][] field = fields.get(fields.size()-1);
            c.view.update(field);
           c.view.getjTable1().validate();
        }
        }
 
        
    }