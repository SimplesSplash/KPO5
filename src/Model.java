
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
    Controller contr;
    String rules="Условия жизни клеток:\n" +
"в пустой (мёртвой) клетке, рядом с которой ровно три живые клетки, зарождается жизнь;\n" +
"• если у живой клетки есть две или три живые соседки, то эта клетка продолжает жить; в противном\n" +
"случае, если соседей меньше двух или больше трёх, клетка умирает («от одиночества» или «от\n" +
"перенаселённости»)\n" +
"\n" +
"Игра прекращается, если\n" +
"• на поле не останется ни одной «живой» клетки,\n" +
"• конфигурация на очередном шаге в точности (без сдвигов и поворотов) повторит себя же на одном из\n" +
"более ранних шагов (складывается периодическая конфигурация),\n" +
"• при очередном шаге ни одна из клеток не меняет своего состояния (складывается стабильная\n" +
"конфигурация; предыдущее правило, вырожденное до одного шага назад)";
    public void gameProcess(){
        System.out.println("Заглушка из метода gameProcess");
            }
    public void showRules(){
        JOptionPane.showMessageDialog(null, rules);
    }
    public void subscribe(Controller c){
        this.contr=c;
    }
    public void notifySub(){
        contr.update(field);
    }
    
}
