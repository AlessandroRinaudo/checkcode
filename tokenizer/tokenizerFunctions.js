const tokenizer = require("../tokenizer/tokenizer");
const parser = require("../parser/parser");
const helper= require("../scoring/helper");

exports.from = (code) => {
    console.log("--------", "Tokens", "--------");
    let tokens = tokenizer(code);
    console.log(tokens);

    try {
        console.log("--------", "AST", "--------");
        let ast = parser(tokens);
        console.log(ast);
        // console.log("hereee",helper.allDeclaredIsUsed(ast));
        console.log("--------", "Result", "--------");
        let result = {
            // allDeclaredIsUsed: helper.allDeclaredIsUsed(ast),
            // allUsedIsDeclared: helper.allUsedIsDeclared(ast),
            // allExpressionFinished: helper.allExpressionFinished(ast),
            // numberLine: helper.numberLine(ast),
            // indentation: helper.indentation(ast)
            syntaxCodeOk:helper.syntaxCodeOk(ast)
        };
        return {
            score: result.syntaxCodeOk,
            details: result
        }
    } catch (e) {
        throw e;
    }

}