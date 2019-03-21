'use strict'




function buttonStart()
{

    let Field1 = [];

    Field1 = getField();


    let g = new gameField(Field1);
    g.life();
}



class gameField {
    constructor(field) {

        this.mainField = field;


    }
    getField() {
        return this.mainField
    }

    neighborsCount(i, j) {

        let n = this.mainField.length - 1;
        let m = this.mainField[0].length - 1;
        let mainField = this.mainField;
        let field = this.mainField;
        function get(i0, j0) {

            if (i0 < 0 || j0 < 0 || i0 > n || j0 > m) {
                return 0;
            }
            let item = field[i0][j0];
            if (item === NaN || item === 0) {
                return 0;
            } else {
                return 1;
            }


        }

        let result = 0;
        result += get(i - 1, j);
        result += get(i - 1, j + 1);
        result += get(i, j - 1);
        result += get(i, j + 1);
        result += get(i + 1, j - 1);
        result += get(i + 1, j + 1);
        result += get(i + 1, j);
        result += get(i - 1, j - 1);
        return result;


    }

    life() {
//        Популяция травоядных обозначается ячейками с отрицательными значениями 
//        (чем старше клетка, тем значение меньше). Популяция хищников- положительными
//        значениями (чем старше клетка, тем значение больше)
        let victim = -1;
        let predator = 1;

//    Рандом для равномерного роста популяции

        if (Math.random() < 0.5) {
            this.born(victim);
            this.born(predator);
        } else {
            this.born(predator);
            this.born(victim);
        }
        this.death();

        drawSubField(this.mainField);
    }

    born(type) {
        let n = this.mainField.length;
        let m = this.mainField[0].length;

        for (let i = 1; i < n; ++i) {

            for (let j = 1; j < m; ++j) {

                if (this.mainField[i][j] === 0) {
                    if (this.neighborsCount(i, j) === 3) {
                        this.mainField[i][j] = type;
                    }
                }
            }

        }

    }

    death() {
        let n = this.mainField.length;
        let m = this.mainField[0].length;
        
//        Функция старения
//        Если клетка не умерла, то ее значение увеличивается/уменьшается
//        в соответствии с популяцией. Клетки Старше 5 поколений умирают.
        function  aging(i, j, Field) {
            if (Field[i][j] > 0) {
                Field[i][j] += 1;
            } else {
                Field[i][j] -= 1;
            }
            if (Math.abs(Field[i][j]) > 5) {
                Field[i][j] = 0;
            }
        }
        
        for (let i = 0; i < n; ++i) {

            for (let j = 0; j < m; ++j) {

                if (this.mainField[i][j] !== 0) {
                    let neighbors = this.neighborsCount(i, j)
                    if (neighbors < 2 || neighbors > 3) {
                        this.mainField[i][j] = 0;
                    } else {
                        aging(i, j, this.mainField);
                    }

                }
            }

        }
    }

}

//module.exports={gameField}