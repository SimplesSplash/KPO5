'use strict'



  
   function buttonStart()
   {

let Field1 = [];

Field1 = getField();
//alert(Field1);

// import mass as Field1 from "../frontend/gameLife"

let g = new gameField(Field1);
g.life();
   }

  

class gameField{
    constructor(field){
            
    this.mainField=field;
    
    
    }
    getField(){
        return this.mainField
    }

    neighborsCount(i,j){
 
            let n=this.mainField.length-1;
            let m=this.mainField[0].length-1;
            let mainField=this.mainField;
            let field=this.mainField;
            function get(i0,j0){
            
                if(i0<0 || j0<0 || i0>n || j0>m){
                    return 0;
                }
                let item=field[i0][j0];
                return item===NaN ? 0 : 1;
            }
            
            let result=0;
            result+=get(i-1,j);
            result+=get(i-1,j+1);
            result+=get(i,j-1);
            result+=get(i,j+1);
            result+=get(i+1,j-1);
            result+=get(i+1,j+1);
            result+=get(i+1,j);
            result+=get(i-1,j-1);
            return result;

    
    }

   

    life(){
       // alert("pusk");
        let n=this.mainField.length;
        let m=this.mainField[0].length;

        for(let i=1; i<n; ++i){
        
                for(let j=1; j<m; ++j){
                
                   if(this.mainField[i][j]===0){
                        if(this.neighborsCount(i,j)===3){
                            this.mainField[i][j]=1;
                        }
                   } 
                }
        
        }

         for(let i=0; i<n; ++i){
        
                for(let j=0; j<m; ++j){
                
                   if(this.mainField[i][j]===1){
                        let neighbors=this.neighborsCount(i,j)
                        if(neighbors<2 || neighbors>3){
                            this.mainField[i][j]=0;
                        }
                   } 
                }
        
        }
      //  alert(this.mainField);
        drawSubField(this.mainField);
    }
    
   

    death(){
        let n=this.mainField.length;
        let m=this.mainField[0].length;

        for(let i=0; i<n; ++i){
        
                for(let j=0; j<m; ++j){
                
                   if(this.mainField[i][j]===1){
                        let neighbors=this.neighborsCount(i,j)
                        if(neighbors<2 || neighbors>3){
                            this.mainField[i][j]=0;
                        }
                   } 
                }
        
        }}
   
}

//module.exports={gameField}
