const constTokens= require("../tokenizer/constants");
const constParser= require("./constants");
const factory= require("./expressionsFactory");

module.exports=(tokens) =>{
    let AST= [];
    let typeFunction = [];
    let inFunction = false;
    for(let i= 0; i<tokens.length; i++){
        let expression= null;
        //déclaration de variable
        if(tokens[i].type == constTokens.typeConst|| tokens[i].type == constTokens.typeVar || tokens[i].type == constTokens.typeLet){
            expression= factory.create(constParser.expressionDeclaration, tokens, i);
            i++;
        //utilisation symbole égale
        }else if(tokens[i].type == constTokens.typeEqual){
            expression= factory.create(constParser.expressionAffectation, tokens, i);
            //si affectation nombre
            if(expression.variableValue.type== constTokens.typeNumber){
                i++;
            //si affectation string on reprend l'analyse après la fermeture des guillements.
            }else{
                i= expression.variableValue.end;
            }
        //utilisation de methode
        }
         // décalration d'une fonction
         else if (tokens[i].type == constTokens.typeFonction) {
            expression= factory.create(constParser.functionDeclaration, tokens, i);
            AST.push(expression);
            i = expression.end;
            inFunction = true;
            expression = ""
        }
        else if (tokens[i].type == constTokens.typeCloseBrace) {
            typeFunction.push(tokens[i])
            AST.push(typeFunction);
            inFunction = false;
            i++
        }
        else if(i<tokens.length-1 && tokens[i].type == constTokens.typeWord &&  tokens[i+1].type==constTokens.symbolePoint){
            expression = factory.create(constParser.expressionMethodCall, tokens, i);
            i= expression.end;
        }
        if(expression){
            if (inFunction == true) {
                typeFunction.push(expression)
            }
            else{
                // console.log("je suis dans le if");
                AST.push(expression);
            }
        }else{
            if (inFunction == true) {
                typeFunction.push(tokens[i])
            }
            else{
                // console.log('je suis dans le else');
                AST.push(tokens[i]);
            }
        }
    }
    return AST;
}