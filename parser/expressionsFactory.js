const constTokens= require("../tokenizer/constants");
const constParser= require("./constants");
const helper= require("./helper");
const parser= require("../parser/parser");
const tokenizer= require("../tokenizer/tokenizer");

exports.create= (type, tokens, start)=>{
    switch(type){
        case constParser.expressionMethodCall:
            return objectMethodCall(tokens, start);
        case constParser.expressionDeclaration:
                return variableDeclaration(tokens, start);
        case constParser.functionDeclaration:
                return functionDeclaration(tokens, start);
        case constParser.conditionIf:
                return conditionIf(tokens, start);
        case constParser.expressionAffectation:
            return variableAffectation(tokens, start);
        case constParser.functionAffectation:
            return functionAffectation(tokens, start);
    }
}

function objectMethodCall(tokens, start){
    let objectName = tokens[start].value;
    if(tokens[start+2].type != constTokens.typeWord) throw constParser.errorMissingWord;
    let methodName = tokens[start+2].value;
    let arguments = helper.searchArgs(tokens, start+3);
    return {type: constParser.expressionMethodCall, objectName: objectName, methodName:methodName, arguments: arguments.args, end: arguments.end};
}

function variableDeclaration(tokens, start){
    if(tokens[start+1].type != constTokens.typeWord) throw constParser.errorMissingWord;
    let variableName= tokens[start+1].value;
    return {type: constParser.expressionDeclaration, variableName: variableName};
}
function functionDeclaration(tokens, start){
    if(tokens[start+1].type != constTokens.typeWord) throw constParser.errorMissingWord;
    let functionName= tokens[start+1].value;
    let functionParam = [];
    let end = start;
    for (let i = start + 3; i < tokens.length; i++) {
        if (tokens[i].type == constTokens.typeCloseParenthese) {
            end = i + 1
            break;
        }
        if (tokens[i].type == constTokens.typeWord) {
            functionParam.push(tokens[i].value);
        }
    }
    return { type: constParser.functionDeclaration, functionName: functionName, functionParam: functionParam, functionBody: [], end: end};
}

function variableAffectation(tokens, start){
    if(tokens[start-1].type != constTokens.typeWord) throw constParser.errorMissingWord;
    let variableName= tokens[start-1].value;
    let variableValue= null;
    if(tokens[start+1].type==constTokens.typeNumber){
        variableValue= tokens[start+1];
    }
    else if(tokens[start+1].type==constTokens.symboleQuotationMark){
        variableValue= helper.searchString(tokens, start+1);
    }
    else if(tokens[start+1].type==constTokens.symboleApostrohe){
        variableValue= helper.searchString(tokens, start+1);
    }
    return {type: constParser.expressionAffectation, variableName: variableName, variableValue: variableValue};
}

function functionAffectation(tokens, start) {
    if (tokens[start].type != constTokens.typeOpenBrace) throw constParser.errorMissingBrace;
    let functionParam = [];
    let functionName
    for (let i = start - 2; i > 0; i--) {
        if (tokens[i].type == constTokens.typeOpenParenthese) {
            functionName = tokens[i - 1].value;
            break;
        }
        functionParam.push(tokens[i]);
    }
    let functionValue = [];
    let end = start;
    for (let i = start + 1; i< tokens.length; i++){
        if (tokens[i].type == constTokens.typeCloseBrace){
            end = i
            break;
        }
        functionValue.push(tokens[i]);
    }
    //console.log(functionParam)
    //console.log(functionValue)
    return { type: constParser.functionAffectation, functionParam: functionParam, functionName: functionName, functionValue: functionValue, end: end };
}

function conditionIf(tokens, start){
    //if(tokens[start-1].type != constTokens.typeWord) throw constParser.errorMissingWord;
    if(tokens[start+1].type != constTokens.typeOpenParenthese ) throw constParser.errorMissingOpenParenthesis;//test si il manque une parenthese apres le if
    let expression=[]; //recupere toute les condition dans if
    let nombre = 0; //recupere le nombre totalque i a parcourue
    for( i=2; (tokens[start+i].type!= constTokens.typeCloseParenthese && i<=10 /*&& tokens[start+i].type!= constTokens. ajouter la contidition pour l'accolade */); i++ ){
        if ( tokens[start+i].value)
            expression = expression + (tokens[start+i].value) + " ";//l'espace sert a separer avec les autres valeurs
        else
            expression = expression + (tokens[start + i].type) + " ";//l'espace sert a separer avec les autres valeurs
        nombre=i;
    }
    //let token = tokenizer(expression);
    //console.log(token);
    //let ast = parser(token);
    //console.log(ast);
    if(tokens[start+nombre+1].type != constTokens.typeCloseParenthese) throw constParser.errorMissingCloseParenthesis;
    if(tokens[start+nombre+2].type != constTokens.typeOpenBrace) throw constParser.errorMissingOpenBrace;
    let conditionName= expression;
    nombre= start+nombre;
    return {type: constParser.conditionIf, conditionName: conditionName, ifBody: [], nombre_iteration:nombre };
}