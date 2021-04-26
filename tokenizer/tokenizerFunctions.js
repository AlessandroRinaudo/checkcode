const tokenizer= require("../tokenizer/tokenizer");

exports.from= (code)=>{
    console.log("--------", "Tokens","--------");
    let tokens= tokenizer(code);
    console.log(tokens);
}