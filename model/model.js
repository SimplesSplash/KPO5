'use strict'




function buttonStart() {

    let Field1 = [];
    let stopped = true;
    Field1 = getField();
    let g = new gameField(Field1);
    g.life();



}

var changed;
var ended;

class gameField {
    constructor(field) {

        this.mainField = field;
        this.fieldCheck;

        this.changed = true;
        this.ended = false;


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



            if (item * value > 0) {
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



    async life() {

        //        ïîïóëßöèßß òðàâîßäíûõ îáîçíà÷àåòñÿ ß÷åéêàìè ñ îòðèöàòåëüíûìè çíà÷åíèßìè 
        //        (÷åì ñòàðøå êëåòêà, òåì çíà÷åíèå ìåíüøå). ïîïóëßöèß õèùíèêîâ- ïîëîæèòåëüíûìè
        //        çíà÷åíèßìè (÷åì ñòàðøå êëåòêà, òåì çíà÷åíèå áîëüøå)
        let victim = -1;
        let predator = 1;

        //    ðàíäîì äëß ðàâíîìåðíîãî ðîñòà ïîïóëßöèè
        while (!this.ended) {
            this.stopped = getStop();


            if ((this.aliveExists()) && (!this.stopped) && (!this.checkGameOver())) {


                if (Math.random() < 0.5) {
                    this.born(predator);
                    drawSubField(this.mainField);
                    await this.sleep(100);
                    this.born(victim);
                    await this.sleep(100);
                    drawSubField(this.mainField);
                } else {
                    this.born(victim);
                    drawSubField(this.mainField);
                    await this.sleep(100);
                    this.born(predator);
                    await this.sleep(100);
                    drawSubField(this.mainField);
                }


                await this.sleep(100);

                this.death();
                drawSubField(this.mainField);
                await this.sleep(100);
                this.interaction();
                drawSubField(this.mainField);
                await this.sleep(100);

            } else {
                this.ended = true;
                console.log("Game over");
            }
        }


    }
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


    aliveExists() {
        let n = this.mainField.length;
        let m = this.mainField[0].length;
        for (let i = 0; i < n; ++i) {
            for (let j = 0; j < m; ++j) {
                if (this.mainField[i][j] !== 0) {
                    return true;
                    break;
                }
            }
        }
        return false;
    }



    born(type) {

        let n = this.mainField.length;
        let m = this.mainField[0].length;

        for (let i = 1; i < n; ++i) {

            for (let j = 1; j < m; ++j) {

                if (this.mainField[i][j] === 0) {
                    if (this.neighborsCount(i, j, type) === 3) {
                        this.mainField[i][j] = type;
                        this.changed = true;
                    }
                }
            }

        }
    }


    death() {
        let n = this.mainField.length;
        let m = this.mainField[0].length;

        //        Ôóíêöèÿ ñòàðåíèÿ
        //        Åñëè êëåòêà íå óìåðëà, òî åå çíà÷åíèå óâåëè÷èâàåòñÿ/óìåíüøàåòñÿ
        //        â ñîîòâåòñòâèè ñ ïîïóëÿöèåé. Êëåòêè Ñòàðøå 5 ïîêîëåíèé óìèðàþò.
        function aging(i, j, Field) {
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



    checkGameOver() {
        let n = this.mainField.length;
        let m = this.mainField[0].length;

        let gameOver = true;


        if (this.fieldCheck == null) {
            //console.log("=null");
            this.fieldCheck = [];
            for (let i = 1; i < n; ++i) {
                this.fieldCheck[i] = [];
                for (let j = 1; j < m; ++j) {
                    this.fieldCheck[i][j] = this.mainField[i][j];

                }
            }

            gameOver = false;
        } else {
            for (let i = 1; i < n; ++i) {
                for (let j = 1; j < m; ++j) {
                    if (this.mainField[i][j] == 0 && this.fieldCheck[i][j] == 0) {

                    } else
                    if (this.mainField[i][j] * this.fieldCheck[i][j] <= 0) {

                        gameOver = false;

                    }

                    this.fieldCheck[i][j] = this.mainField[i][j];

                }
            }


        }

        return gameOver;

    }




    //метод, отвечающий за взаимодействие двух популяций

    interaction() {

        let n = this.mainField.length;
        let m = this.mainField[0].length;


        for (let i = 0; i < n; ++i) {

            for (let j = 0; j < m; ++j) {

                if (this.mainField[i][j] < 0 && this.neighborsCount(i, j, 1) >= 1) {
                    this.mainField[i][j] = 0;
                } else if (this.mainField[i][j] > 0 && this.neighborsCount(i, j, -1) > 1) {
                    this.mainField[i][j] = 0;
                }

            }
        }
    }
}