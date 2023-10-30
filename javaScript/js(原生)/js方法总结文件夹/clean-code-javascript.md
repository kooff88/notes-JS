
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


```js
// bad

const menuConfig = {
  title: null,
  body: "Bar",
  "buttonText": null,
  cancelable: true
}

function createMenu(config){
  config.title = config.title || "Foo",
  config.body = config.body || "Bar",
  config.buttonText = config.buttonText || "Baz",
  config.cancellable = config.cancelable !== undefined ? config.cancellable : true;
}

createMenu( menuConfig);


//good
const menuConfig = {
  title: "Order",
  // User did not include 'body' key
  buttonText: "Send",
  cancellable: true
};

function createMenu(config){
  let finalConfig = Object.assign(
    {
      title: "Foo",
      body: "Bar",
      buttonText: "Baz",
      cancelable: true
    },
    config
  );
  return finalConfig
}

createMenu( menuConfig );


```


```js
// bad
function createFile(name, temp) {
  if (temp) {
    fs.create(`./temp/${name}`);
  }else {
    fs.create(name);
  }
}

// good
function createFile(name) {
  fs.create(name);
}

function createTempFile(name) {
  createFile(`./temp/${name}`)
}

```



```js
// bad
let name = "Ryan McDermott";

function splitIntoFirstAndLastName(){
  name = name.split(" ")
}

splitIntoFirstAndLastName();

console.log(name);


// good
function splitIntoFirstAndLastName(name){
  return name.split(" ");
}

const name = "Ryan McDermott";
const newName = splitIntoFirstAndLastName(name);

console.log(name);
console.log(newName);

```


```js
// bad
const addItemToCart = (cart, item) => {
  cart.push({ item, date: Date.now() })
}

// good
const addItemToCart = ( cart, item) => {
  return [ ...cart, { item,date: Date.now() }];
}

```


```js
// bad
Array.prototype.diff = function diff( comparisonArray ) {
  const hash = new Set( comparisonArray );
  return this.filter( elem => !hash.has(elem));
}


// good
class SuperArray extends Array {
  diff(comparisonArray){
    const hash = new Set( comparisonArray );
    return this.filter( elem => !hash.has(elem));
  }
}

```



```js
// bad
const programmerOutput = [
  {
    name: "Uncle Bobby",
    linesOfCode: 500
  },
  {
    name: "Suzie Q",
    linesOfCode: 1500
  },
  {
    name: "Jimmy Gosling",
    linesOfCode: 150
  },
  {
    name: "Gracie Hopper",
    linesOfCode: 1000
  }
];

let totalOutput = 0;


for(let i = 0; i < programmerOutput.length; i++ ){
  totalOutput += programmerOutput[i].linesOfCode;
}


// good
const programmerOutput = [
  {
    name: "Uncle Bobby",
    linesOfCode: 500
  },
  {
    name: "Suzie Q",
    linesOfCode: 1500
  },
  {
    name: "Jimmy Gosling",
    linesOfCode: 150
  },
  {
    name: "Gracie Hopper",
    linesOfCode: 1000
  }
];

const totalPutput = programmerOutput.reduce(
  ( totalLines, output ) => totalLines + output.linesOfCode, 0
)

```



```js
// bad
if (fsm.state === "fetching" && isEmpty(listNode)){
  // ...
}

// good
function shouldShowSpinner(fsm, listNode){
  return fsm.state === "fetching" && isEmpty( listNode );
}

if ( shouldShowSpinner( fsmInstance, listNodeInstance )){
  // ... 
}

```


```js
class Airplane {
  // ... 

}

class Boeing777 extends Airplane {
  getCruisingAltitude() {
    return this.getMaxAltitude() - this.getPassengerCount();
  }
}


class AirForceOne extends Airplane {
  // ...
  getCruisingAltitude() {
    return this.getMaxAltitude();
  }
}

class Cessna extends Airplane {
  // ...
  getCruisingAltitude() {
    return this.getMaxAltitude() - this.getFuelExpenditure();
  }
}

```