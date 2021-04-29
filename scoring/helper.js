exports.syntaxCodeOk = (ast) => {
  return 1
}
exports.allVariableAre = (ast) => {
  let variablesAffectations = []
  let variablesDeclarations = []
  let j=0
  for (i = 0; i < ast.length; i++) {
    if (ast[i].type === 'variableAffectation'){
      variablesAffectations[j] = ast[i].variableName
      j++
    }
      
  }
  j=0
  for (i = 0; i < ast.length; i++) {
    if (ast[i].type === 'variableDeclaration'){
      variablesDeclarations[j] = ast[i].variableName
      j++;
    }
  }

// test si une variable a ete cree avant sa declaration et si la varible declarer a deja ete declarer avant
  for(i=0; i < ast.length; i++){
    //console.log(i, ast[i], "1");
    for (j=0; j < i; j++){
      //console.log(j, ast[j], "2");
      if(ast[j].type=="variableDeclaration" && ast[j].variableName == ast[i].variableName && ast[i].type=="variableDeclaration" ){
        console.log("variable deja declare");
        return 0;
      }
      if(ast[j].type=="variableAffectation" && ast[j].variableName==ast[i].variableName && ast[i].type=="variableDeclaration" ){
        console.log("affectation de variable sans l avoir declarer ");
        return 0;
      }
    }
  }




  for(i=0;i<variablesDeclarations.length;i++) {
    for(j=0;j<variablesAffectations.length;j++) {
      if(variablesAffectations[j]=== variablesDeclarations[i]) 
        variablesAffectations[j] = true
    }
  }

  for(i=0;i<variablesAffectations.length;i++) {
    if(variablesAffectations[i]!=true) 
      return 0;
  }


  return 1
}

exports.allVariablesAreUsed = (ast) => {

//  test pour savoir si la variable declarer est utiliser une seconde fois
  
  for(i=0; i<ast.length; i++){
    if(ast[i].type == "variableDeclaration"){
      let utiliser = false;
      // console.log(ast[i]);
      // console.log(utiliser);
     for(j=i+2; j<ast.length; j++){
       
      if(ast[j].type=="variableAffectation" && ast[j].variableName==ast[i].variableName /*|| ast[j].type == "word" && ast[j].variableName == ast[i].variableName*/){
        // console.log("var");
        // console.log(ast[j].variableName);
        // console.log(ast[i].variableName);
        utiliser = true;
      }
      if(ast[j].type=="conditionIf" && ast[j].conditionName==ast[i].variableName){
       // console.log("if");
        utiliser=true;
      }
    }
    // console.log(utiliser);
    if(utiliser==false){
      console.log("la variable n'est pas utilise ");
      return 0;
    }
   }
  }

  return 1
}


exports.allOpenAndCloseIsOk = (ast) => {

  // test si une accolade est bien fermé
  for(i=0; i < ast.length; i++){
    //console.log(i, ast[i], "1");
    if(ast[i].type=="closeBrace"){
      let nbOpen=0;
      let nbClose=1;
      console.log("iccciiiii");
      for(j=0; j < i; j++){
        //console.log("2");
        if(ast[j].type=="openBrace"){
          nbOpen++;
          console.log("Open");
        }
        if(ast[j].type=="closeBrace"){
          nbClose++;
          console.log("Close");
        }
      }    
      if(nbOpen!= nbClose && nbOpen > nbClose /* ajouter un test pour savoir si il ya une autre ouverture a la suite*/ ){
        console.log("ya trop de openBrace");
        return 0;
      }
      if(nbOpen!= nbClose && nbOpen < nbClose ){
        console.log("ya trop de closeBrace");
        return 0;
      }
    }
  }

  return 1;


  //test si un croche est bien fermé
  for(i=0; i < ast.length; i++){
    //console.log(i, ast[i], "1");
    if(ast[i].type=="closeBrace"){
      let nbOpen=0;
      let nbClose=1;
      console.log("iccciiiii");
      for(j=0; j < i; j++){
        //console.log("2");
        if(ast[j].type=="openBrace"){
          nbOpen++;
          console.log("Open");
        }
        if(ast[j].type=="closeBrace"){
          nbClose++;
          console.log("Close");
        }
      }    
      if(nbOpen!= nbClose && nbOpen > nbClose /* ajouter un test pour savoir si il ya une autre ouverture a la suite*/ ){
        console.log("ya trop de openBrace");
        return 0;
      }
      if(nbOpen!= nbClose && nbOpen < nbClose ){
        console.log("ya trop de closeBrace");
        return 0;
      }
    }
  }

  //test

}