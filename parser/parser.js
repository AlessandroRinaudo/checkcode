const constTokens= require("../tokenizer/constants");
const constParser= require("./constants");
const factory= require("./expressionsFactory");

module.exports=(tokens) =>{
    let AST= [];
    let typeFunction = [];
    let inFunction = false;
    let typeIf = [];
    let inIf = false;
    for(let i= 0; i<tokens.length; i++){
        let expression = null;
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
        else if (tokens[i].type == constTokens.typeIf) {
            expression = factory.create(constParser.conditionIf, tokens, i);
            if (inFunction == true){
                typeFunction.push(expression);
            }
            else {
                AST.push(expression);
            }
            i = expression.nombre_iteration;
            inIf = true;
            expression = ""

        }
        else if (tokens[i].type == constTokens.typeComment) {
            expression = factory.create(constParser.expressionComment, tokens, i);
            i = expression.end;
        }
        else if (tokens[i].type == constTokens.typeCloseBrace) {
            if (inIf == true){
                typeIf.push(tokens[i])
                inIf = false;
                i++
                if (inFunction == true)
                    typeFunction[typeFunction.length - 1].ifBody = typeIf
                else
                    AST[AST.length - 1].ifBody = typeIf
                typeIf = []
            }
            else if (inFunction == true) {
                typeFunction.push(tokens[i])
                inFunction = false;
                i++
                AST[AST.length - 1].functionBody = typeFunction
                typeFunction = []
            }
        }
        else if(i<tokens.length-1 && tokens[i].type == constTokens.typeWord &&  tokens[i+1].type==constTokens.symbolePoint){
            expression = factory.create(constParser.expressionMethodCall, tokens, i);
            i= expression.end;
        }
        if(expression){
            if (inIf == true) {
                typeIf.push(expression)
            }
            else if (inFunction == true) {
                typeFunction.push(expression)
            }
            else{
                AST.push(expression);
            }
        }else{
            if (inIf == true) {
                typeIf.push(tokens[i])
            }
            else if (inFunction == true) {
                typeFunction.push(tokens[i])
            }
            else{
                AST.push(tokens[i]);
            }
        }
    }
    return AST;
}