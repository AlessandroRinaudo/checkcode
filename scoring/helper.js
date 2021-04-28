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

