'use strict'




function buttonStart() {
    //alert("rrr");
    let Field1 = [];

    Field1 = getField();
    //alert(Field1);

    // import mass as Field1 from "../frontend/gameLife"

    let g = new gameField(Field1);


g.life();
    // while (g.checkGameOver() == false) {
    //     g.life();

    // }
    // alert("Game Over");



}



class gameField {
    constructor(field) {

        this.mainField = field;
        this.fieldCheck;


    }
    getMainField() {
        return this.mainField
    }

    neighborsCount(i, j, value) {

        let n = this.mainField.length - 1;
        let m = this.mainField[0].length - 1;
        let mainField = this.mainField;
        let field = this.mainField;

  function get(i0, j0) {

            if (i0 < 0 || j0 < 0 || i0 > n || j0 > m) {
                return 0;
            }
            let item = field[i0][j0];
            
            if (item == value) {
                return 1;
            } else {
                return 0;
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
    //     function get(i0, j0) {

    //         if (i0 < 0 || j0 < 0 || i0 > n || j0 > m) {
    //             return 0;
    //         }
    //         let item = field[i0][j0];

    //         if (item == value) {
    //             return 1;
    //         } else {
    //             return 0;
    //         }

    //         // if(item===NaN || item===0){
    //         //     return 0;
    //         // }
    //         //  else {
    //         //     return 1;
    //         // }


    //     }

    //     let result = 0;
    //     result += get(i - 1, j);
    //     result += get(i - 1, j + 1);
    //     result += get(i, j - 1);
    //     result += get(i, j + 1);
    //     result += get(i + 1, j - 1);
    //     result += get(i + 1, j + 1);
    //     result += get(i + 1, j);
    //     result += get(i - 1, j - 1);
    //     return result;


    // }



    checkGameOver() {
        let n = this.mainField.length;
        let m = this.mainField[0].length;

        let gameOver = true;
        //   let zero = true;




        if (this.fieldCheck == null) {
            //console.log("=null");
            this.fieldCheck = [];
            for (let i = 1; i < n; ++i) {
                this.fieldCheck[i] = [];
                for (let j = 1; j < m; ++j) {
                    this.fieldCheck[i][j] = this.mainField[i][j];

                }
            }
            //this.fieldCheck = mainField;


            gameOver = false;
            //console.log("change" + this.fieldCheck);
        } else {

            // alert(this.mainField);
            // alert(this.fieldCheck);

            for (let i = 1; i < n; ++i) {
                for (let j = 1; j < m; ++j) {
                    if (this.mainField[i][j] !== this.fieldCheck[i][j]) {
                      //  console.log("!=")
                        gameOver = false;
                        //break;
                    }


                    // if (this.mainField[i][j] != 0) {
                    //     zero = false;
                    // }
                    this.fieldCheck[i][j] = this.mainField[i][j];

                }
            }




            //gameOver += zero;
        }



      // console.log(gameOver);
        return gameOver;

    }


    life() {


        // if (this.checkGameOver() == true) {
        //     alert("Game over");
        // } else {



        let victim = -1;
        let predator = 1;


        //    Слкчайность введена для равномерного создания видов.
        //    Иначе вид, создаваемый первым, преобладает.  



        if (Math.random() < 0.5) {
            this.born(victim);
            this.born(predator);
        } else {
            this.born(predator);
            this.born(victim);
        }

        this.death();
        //this.interaction();

        drawSubField(this.mainField);


    }

    born(type) {
        //alert("born");
        let n = this.mainField.length;
        let m = this.mainField[0].length;

        for (let i = 1; i < n; ++i) {

            for (let j = 1; j < m; ++j) {

                if (this.mainField[i][j] === 0) {
                    if (this.neighborsCount(i, j, type) === 3) {
                        this.mainField[i][j] = type;
                    }
                }
            }

        }
    }

    // death() {
    //     //alert("de");
    //     let n = this.mainField.length;
    //     let m = this.mainField[0].length;

    //     for (let i = 0; i < n; ++i) {

    //         for (let j = 0; j < m; ++j) {

    //             if (this.mainField[i][j] === 1 || this.mainField[i][j] === 2) {
    //                 let neighbors = this.neighborsCount(i, j, this.mainField[i][j])
    //                 if (neighbors < 2 || neighbors > 3) {
    //                     this.mainField[i][j] = 0;
    //                 }
    //             }
    //         }

    //     }
    // }

      death() {
        let n = this.mainField.length;
        let m = this.mainField[0].length;
        
//        Ôóíêöèÿ ñòàðåíèÿ
//        Åñëè êëåòêà íå óìåðëà, òî åå çíà÷åíèå óâåëè÷èâàåòñÿ/óìåíüøàåòñÿ
//        â ñîîòâåòñòâèè ñ ïîïóëÿöèåé. Êëåòêè Ñòàðøå 5 ïîêîëåíèé óìèðàþò.
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
                    let neighbors = this.neighborsCount(i, j, this.mainField[i][j])
                    if (neighbors < 2 || neighbors > 3) {
                        this.mainField[i][j] = 0;
                    } else {
                        aging(i, j, this.mainField);
                    }

                }
            }

        }
    }




    enemyCheck(i, j, value) {


        let field = this.mainField;
        let n = this.mainField.length - 1;
        let m = this.mainField[0].length - 1;


        if (i < 0 || j < 0 || i > n || j > m) {
            return 0;
        } else {
            let item = field[i][j];

            if (item == value) {
                return 1;
            } else {
                return 0;
            }
        }

    }




    //метод, отвечающий за взаимодействие двух популяций
    interaction() {

        let n = this.mainField.length;
        let m = this.mainField[0].length;
        let count = 1;
        let countEnemy = 0;
        let j_first;
        let draw = false;

        for (let i = 0; i < n; ++i) {
            if (draw === true) {
                break;
            }

            for (let j = 0; j < m; ++j) {
                console.log(j);

                if (this.mainField[i][j] === 2) {
                    console.log("хищники окружают");
                    countEnemy = 0;
                    count = 0;
                    j_first = j;

                    countEnemy += this.enemyCheck(i - 1, j - 1, -1);
                    countEnemy += this.enemyCheck(i, j - 1, -1);
                    countEnemy += this.enemyCheck(i + 1, j - 1, -1);


                    do {
                        count++;
                        countEnemy += this.enemyCheck(i - 1, j, -1);
                        countEnemy += this.enemyCheck(i + 1, j, -1);

                        j++
                    } while (this.mainField[i][j - 1] === this.mainField[i][j])


                    countEnemy += this.enemyCheck(i - 1, j, -1);
                    countEnemy += this.enemyCheck(i, j, -1);
                    countEnemy += this.enemyCheck(i + 1, j, -1);


                    console.log("count = " + count);
                    console.log("countEnemy = " + countEnemy);



                    if (countEnemy >= count) {
                        console.log(">");
                        for (let k = j_first; k <= j; ++k) {
                            this.mainField[i][k] = 0;
                        }

                        console.log("break");
                        draw = true;
                        break;

                    }


                } else if (this.mainField[i][j] === 1) {
                    console.log("травоядные окружают");

                    countEnemy = 0;
                    count = 0;
                    j_first = j;

                    countEnemy += this.enemyCheck(i - 1, j - 1, 1);
                    countEnemy += this.enemyCheck(i, j - 1, 1);
                    countEnemy += this.enemyCheck(i + 1, j - 1, 1);


                    do {
                        count++;
                        countEnemy += this.enemyCheck(i - 1, j, 1);
                        countEnemy += this.enemyCheck(i + 1, j, 1);

                        j++
                    } while (this.mainField[i][j - 1] === this.mainField[i][j])


                    countEnemy += this.enemyCheck(i - 1, j, 1);
                    countEnemy += this.enemyCheck(i, j, 1);
                    countEnemy += this.enemyCheck(i + 1, j, 1);


                    console.log("count = " + count);
                    console.log("countEnemy = " + countEnemy);



                    if (countEnemy > count) {
                        for (let k = j_first; k <= j; ++k) {
                            this.mainField[i][k] = 0;
                        }

                        draw = true;
                        console.log("break");
                        break;
                    }

                }

            }

        }


        drawSubField(this.mainField);




    }

}
//module.exports={gameField}