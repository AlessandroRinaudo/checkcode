exports.specialChars = {
    booleanEqual: { regRule: /(\=\=)/g, value: '==' },
    different: { regRule: /(\!\=)/g, value: '!=' },
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
    closeParenthese:  {regRule: /\)/g, value:'"'},
    openCrochet: {regRule: /\[/g, value:'['},
    closeCrochet: { regRule: /\]/g, value: ']' },
    openBrace:  {regRule: /\{/g, value:'{'},
    closeBrace:  {regRule: /\}/g, value:'}'},
    colon:  {regRule: /\:/g, value:':'},
    aposthrophe:  {regRule: /\'/g, value:"'"},
    incrementations: {regRule: /\+\+/g, value: "++"},
    decrementations: { regRule: /\-\-/g, value: "--" },
    addition: {regRule: /(\+)/g, value:'+'},
    soustraction: { regRule: /(\-)/g, value: '-' },
    division: { regRule: /(\/)/g, value: '/' },
    and: { regRule: /(\&\&)/g, value: '&&' },
    or: { regRule: /(\|\|)/g, value: '||' },

};

exports.symbolePoint            = "point";
exports.symboleVirgule          = "virgule";
exports.symboleQuotationMark    = "quotationMark";
exports.symboleOpenParenthese   = "openParenthese";
exports.symboleCloseParenthese  = "closeParenthese";
exports.symboleConst            = "constant";
exports.symboleVar              = "var";
exports.symboleLet              = "let";
exports.symboleOpenBrace        = "openBrace";
exports.symboleCloseBrace       = "closeBrace";
exports.symboleColon            = "colon";
exports.symboleApostrohe        = "'";
exports.symboleOpenCrochet      = "openCrochet";
exports.symboleCloseCrochet     = "closeCrochet";
exports.symboleIncrementation   = "incrementation";
exports.symboleDecrementation   = "decrementation";

exports.typeNumber      = "number";
exports.typeWord        = "word";
exports.typeConst       = "constant";
exports.typeVar         = "variable";
exports.typeLet         = "variable";
exports.typeOpenBrace   = "openBrace";
exports.typeCloseBrace  = "closeBrace";
exports.typeColon       = "colon";
exports.typeColon       = "apostrhophe";
exports.typeIncrementation = "incrementation";
exports.typeDecrementation = "decrementation";
exports.typeAddition = "addition";
exports.typeSoustraction = "soustraction";
exports.typeMultiplication = "multiplication";
exports.typeDivision = "division";

exports.typeAnd = "and";
exports.typeOr = "or";
exports.typeBooleanEqual = "booleanEqual";
exports.typeDifferent = "different";

exports.typeEqual = "equal";

exports.errorNoTokenFound = 'No Tokens Found.';

