const tokenizer= require("../tokenizer/tokenizer");
const parser= require("../parser/parser");

exports.from= (code)=>{
    console.log("--------", "Tokens","--------");
    let tokens= tokenizer(code);
    console.log(tokens);

    try{
        console.log("--------", "AST","--------");
        let ast= parser(tokens);
        console.log(ast);
    }catch(e){
        throw e;
    }
}