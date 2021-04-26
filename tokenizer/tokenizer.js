
const helper = require("./helper");
const constTokens= require("./constants");

module.exports = function(code) {
    code= helper.replaceSpecialsChars(code);
    var _tokens = code.split(/[\n\t\f\v ]+/);
    var tokens = []
    for (var i = 0; i < _tokens.length; i++) {
      var t = _tokens[i]
      //si le token n'est pas un nombre
      if(t.length <= 0 || isNaN(t)) {
        //on check si c'est un caractère spéciale
        let typeChars= helper.checkChars(t);
        if (typeChars){
            tokens.push({type: typeChars})
        //sinon c'est un mot
        }
        else{
            if(t=='const'){
              tokens.push({type: constTokens.typeConst})
            }
            else if(t=='var'){
              tokens.push({type: constTokens.typeVar})
            }
            else if(t=='let'){
              tokens.push({type: constTokens.typeLet})
            }
            else if(t=='{'){
              tokens.push({type: constTokens.typeOpenBrace})
            }
            else if(t=='{'){
              tokens.push({type: constTokens.typeOpenBrace})
            }
            else if(t==':'){
              tokens.push({type: constTokens.typeColon})
            }
            else
              tokens.push({type: constTokens.typeWord, value: t})
        }
      //sinon c'est un nombre
      } else {
        tokens.push({type: constTokens.typeNumber, value: t})
      }
    }
    if (tokens.length < 1) {
        throw constTokens.errorNoTokenFound;
    }
    return tokens
}