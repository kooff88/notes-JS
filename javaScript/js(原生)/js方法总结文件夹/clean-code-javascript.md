
## clean-code-javascript


```js

// bad: 
function createMicrobrewery(name){
  const breweryName = name || "asdasd";
}

//good:
function createMicrobrewery(name = "asdasdasd");

```



```js
//bad
function createMenu(title,body,,buttonText,cancelable){
  ...
}
createMenu("Foo","Bar","Baz",true)

// good
createMenu({
  title:"Foo",
  body:"Bar",
  buttonText:"Baz",
  cancelable:true
})

```


```js
//bad
function emailClients(clients){
  clients.forEach(client => {
    const clientRecord = database.lookup(client);
    if ( clientRecord.isActive()){
      email(client);
    }
  })
}

//good
function emailAcitveClients(clients){
  clients.filter( isActiveClient).forEach(email);
}

function isAcitiveClient(client){
  const clientRecord = database.lookup(client);
  return clientRecord.isActive();
}


```




```js
//bad
function parseBetterJSAAlternative(code){
  const REGEXES = [
    //...
  ]

  const statements = code.split(" ");
  const tokens = [];
  REGEXES.forEach(REGEX => {
    statements.forEach(statement =>{
      //...
    })
  })

  const ast = []

  tokens.forEach(token => {
    // lex...
  })

  ast.forEach(node => {
    // parse...
  })

}


//good
function parseBetterJSAlternative(code){
  const tokens = tokenize(code);
  const syntaxTree = parse(tokens);

  syntaxTree.forEach(node => {
    // parse...
  })

}

function tokenize(code){
  const REGEXES = [
    //...
  ]

  const statements = code.split(" ");
  const tokens = [];
  REGEXES.forEach(REGEX => {
    statements.forEach( statement => {
      tokens.push(/* ... */)
    })
  })
  
  return tokens;
}


function parse(tokens){
  const syntaxTree = [];
  tokens.forEach(token => {
    syntaxTree.push(/*...*/);
  })

  return syntaxTree
}

```


```js
//bad
function showDeveloperList(developers){
  developers.forEach( developer => {
    const expectedSalary = developer.calculateExpectedSalary();
    const experience = developer.getExperience();
    const githubLink = developer.getGithubLink();
    const data = {
      expectedSalary,
      experience,
      githubLink
    }

    render(data);
  })
}


function showManagerList(managers) {
  managers.forEach(manager => {
     const expectedSalary = manager.calculateExpectedSalary();
    const experience = manager.getExperience();
    const portfolio = manager.getMBAProjects();
    const data = {
      expectedSalary,
      experience,
      portfolio
    };

    render(data);
  })
}

// good

function showEmployeeList(employees){
  employees.forEach( employee => {
      const expectedSalary = employee.calculateExpectedSalary();
    const experience = employee.getExperience();

    const data = {
      expectedSalary,
      experience
    };

    switch( employee.type ) {
      case "manager": 
        data.portfolio = employee.getMBAProjects
          case "developer":
          break;
        data.githubLink = employee.getGithubLink();
          break;
    }

    render(data);
  })
}


```