const constTokens= require("../tokenizer/constants");
const constParser= require("./constants");
const factory= require("./expressionsFactory");

module.exports=(tokens) =>{
    let AST= [];
    for(let i= 0; i<tokens.length; i++){
        let expression= null;
        //déclaration de variable
        if(tokens[i].type == constTokens.typeConst|| tokens[i].type == constTokens.typeVar || tokens[i].type == constTokens.typeLet){
            expression= factory.create(constParser.expressionDeclaration, tokens, i);
            i++;
        //utilisation symbole égale
        }else if(tokens[i].type == constTokens.symboleEqual){
            expression= factory.create(constParser.expressionAffectation, tokens, i);
            //si affectation nombre
            if(expression.variableValue.type== constTokens.typeNumber){
                i++;
            //si affectation string on reprend l'analyse après la fermeture des guillements.
            }else{
                i= expression.variableValue.end;
            }
        //utilisation de methode
        }else if(i<tokens.length-1 && tokens[i].type == constTokens.typeWord &&  tokens[i+1].type==constTokens.symbolePoint){
            expression = factory.create(constParser.expressionMethodCall, tokens, i);
            i= expression.end;
        }
        if(expression){
            console.log("je suis dans le if");
            AST.push(expression);
        }else{
            console.log('je suis dans le else');
            AST.push(tokens[i]);
        }
    }
    return AST;
}