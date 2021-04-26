exports.specialChars = {
    newLine:        {regRule: /\r\n/g, value:'\n'},
    endInstruct:    {regRule: /;/g,  value:';'},
    equal:          {regRule: /=/g, value:'='},
    const:          {regRule: /@const/g, value:'const'},
    var:          {regRule: /@var/g, value:'var'},
    let:          {regRule: /@let/g, value:'let'},
    point:           {regRule: /\./g, value:'.'},
    virgule:           {regRule: /\,/g, value:','},
    quotationMark:  {regRule: /\"/g, value:'"'},
    openParenthese:  {regRule: /\(/g, value:'"'},
    closeParenthese:  {regRule: /\)/g, value:'"'}
};

exports.symboleEqual            = "equal";
exports.symbolePoint            = "point";
exports.symboleVirgule          = "virgule";
exports.symboleQuotationMark    = "quotationMark";
exports.symboleOpenParenthese   = "openParenthese";
exports.symboleCloseParenthese  = "closeParenthese";
exports.symboleConst            = "constant";
exports.symboleVar            = "var";
exports.symboleLet            = "let";

exports.typeNumber  = "number";
exports.typeWord    = "word";
exports.typeConst    = "constant";
exports.typeVar    = "variable";
exports.typeLet   = "variable";

exports.errorNoTokenFound = 'No Tokens Found.';

