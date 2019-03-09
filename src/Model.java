

import javax.swing.JOptionPane;
import javax.swing.JTable;

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

    public void gameProcess(JTable jTable1) {
         int n = jTable1.getRowCount();
        int m = jTable1.getColumnCount();
        
        if (field == null) {
            field = new int[n][m];

            System.out.println("qqq" + field.length);

            for (int i = 0; i < n; i++) {
                for (int j = 0; j < m; j++) {
                    field[i][j] = 0;
                }
            }

        }
       
          System.out.println("qqq" + field.length);
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                field[i][j] = Integer.parseInt(jTable1.getValueAt(i, j).toString());
                System.out.print(field[i][j] + " ");
            }
            System.out.println("");

        }
        int count = 0;
        for (int i = 1; i < n - 1; i++) {
            for (int j = 1; j < m - 1; j++) {
                if ((field[i][j]==1)&&(field[i + 1][j + 1] == 1)) {
                    count++;
                }
                if ((field[i][j]==1)&&(field[i - 1][j - 1] == 1)) {
                    count++;
                }
                if ((field[i][j]==1)&&(field[i - 1][j] == 1)) {
                    count++;
                }
                if ((field[i][j]==1)&&(field[i + 1][j] == 1)) {
                    count++;
                }
                if (count >= 1) {
                    field[i][j] = 1;
                } else {
                    field[i][j] = 0;
                }
                count = 0;
            }
        }
        notifySub();
    }

    public void showRules() {
        JOptionPane.showMessageDialog(null, rules);
    }

    public void subscribe(Controller c) {
        this.contr = c;
    }

    public void notifySub() {
        contr.update(field);
    }

    public void test() {

    }

}
