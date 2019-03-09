
import javax.swing.JOptionPane;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 *
 * @author Алексей
 */
public class Model {

    int[][] field;
    boolean stopped;
    boolean changed;
    Controller contr;
    String rules = "Условия жизни клеток:\n"
            + "в пустой (мёртвой) клетке, рядом с которой ровно три живые клетки, зарождается жизнь;\n"
            + "• если у живой клетки есть две или три живые соседки, то эта клетка продолжает жить; в противном\n"
            + "случае, если соседей меньше двух или больше трёх, клетка умирает («от одиночества» или «от\n"
            + "перенаселённости»)\n"
            + "\n"
            + "Игра прекращается, если\n"
            + "• на поле не останется ни одной «живой» клетки,\n"
            + "• конфигурация на очередном шаге в точности (без сдвигов и поворотов) повторит себя же на одном из\n"
            + "более ранних шагов (складывается периодическая конфигурация),\n"
            + "• при очередном шаге ни одна из клеток не меняет своего состояния (складывается стабильная\n"
            + "конфигурация; предыдущее правило, вырожденное до одного шага назад)";

    public Model() {
        this.changed = true;
    }
   
    
    public void gameProcess(int[][] startField) throws InterruptedException {
//        TimeUnit.SECONDS.sleep(1);
        // System.out.println("Заглушка из метода gameProcess");
       int n = startField.length;
        int m = startField[0].length;
        if (field == null) {
            field = new int[n][m];

            System.out.println("qqq" + field.length);

            for (int i = 0; i < n; i++) {
                System.arraycopy(startField[i], 0, field[i], 0, m);
            }

        }
        while(changed && aliveExists()){
           
        changed = false;

        test();
        

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if (field[i][j] == 0) {
                    if (countSosed(i, j, n, m) == 3) {
                        field[i][j] = 1;
                        changed = true;
//                        notifySub();
                        
 
                   
                    }
                }
            }
        }
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if (field[i][j] == 1) {
                    if ((countSosed(i, j, n, m) < 2) || (countSosed(i, j, n, m) > 3)) {
                        field[i][j] = 0;
                        changed = true;
//                        notifySub();
                        

                       
                    }
                }
            }
        }
      notifySub();  
    }

//        JOptionPane.showMessageDialog(null, "END!");
    }
    public boolean aliveExists(){
        int n = field.length;
        int m = field[0].length;
         for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if(field[i][j]==1){
                    return true;
                }
            }
         }
         return false;
    }
    

    public int endMassive(int i0, int j0, int n, int m) {
        if (i0 < 0 || j0 < 0 || i0 > n || j0 > m) {
            return 0;
        }
        try {
            int item = field[i0][j0];
            return item;
        } catch (ArrayIndexOutOfBoundsException e) {
        }
        return 0;

    }

    public int countSosed(int i0, int j0, int n, int m) {
        int count = 0;
        count += endMassive(i0 - 1, j0, n, m);
        count += endMassive(i0 - 1, j0 + 1, n, m);
        count += endMassive(i0, j0 - 1, n, m);
        count += endMassive(i0, j0 + 1, n, m);
        count += endMassive(i0 + 1, j0 - 1, n, m);
        count += endMassive(i0 + 1, j0 + 1, n, m);
        count += endMassive(i0 + 1, j0, n, m);
        count += endMassive(i0 - 1, j0 - 1, n, m);
        return count;
    }

    public void showRules() {
        JOptionPane.showMessageDialog(null, rules);
    }

    public void subscribe(Controller c) {
        this.contr = c;
    }

    public void notifySub() throws InterruptedException {
        contr.update(field);
    }

    public void test() {

    }

}
