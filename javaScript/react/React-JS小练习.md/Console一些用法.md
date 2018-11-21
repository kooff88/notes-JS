# Console用法



./app/js
```js
import React, { Component } from 'react';
// import logo from './2.jpeg';
import './App.less';


class App extends Component {

  constructor(props){
    super(props);
    this.state={
    }
    
  }

  componentDidMount(){
    const inventors  = [
      { first: 'Albert',last:'Einstein',year:1879,passed:1955 },
      { first: 'Isaac', last: 'Newton', year: 1643, passed: 1727 },
      { first: 'Galileo', last: 'Galilei', year: 1564, passed: 1642 },
      { first: 'Marie', last: 'Curie', year: 1867, passed: 1934 },
      { first: 'Johannes', last: 'Kepler', year: 1571, passed: 1630 },
      { first: 'Nicolaus', last: 'Copernicus', year: 1473, passed: 1543 },
      { first: 'Max', last: 'Planck', year: 1858, passed: 1947 },
      { first: 'Katherine', last: 'Blodgett', year: 1898, passed: 1979 },
      { first: 'Ada', last: 'Lovelace', year: 1815, passed: 1852 },
      { first: 'Sarah E.', last: 'Goode', year: 1855, passed: 1905 },
      { first: 'Lise', last: 'Meitner', year: 1878, passed: 1968 },
      { first: 'Hanna', last: 'Hammarström', year: 1829, passed: 1909 }
    ]

    const people = ['Beck, Glenn', 'Becker, Carl', 'Beckett, Samuel', 'Beddoes, Mick', 'Beecher, Henry', 'Beethoven, Ludwig', 'Begin, Menachem', 'Belloc, Hilaire', 'Bellow, Saul', 'Benchley, Robert', 'Benenson, Peter', 'Ben-Gurion, David', 'Benjamin, Walter', 'Benn, Tony', 'Bennington, Chester', 'Benson, Leana', 'Bent, Silas', 'Bentsen, Lloyd', 'Berger, Ric', 'Bergman, Ingmar', 'Berio, Luciano', 'Berle, Milton', 'Berlin, Irving', 'Berne, Eric', 'Bernhard, Sandra', 'Berra, Yogi', 'Berry, Halle', 'Berry, Wendell', 'Bethea, Erin', 'Bevan, Aneurin', 'Bevel, Ken', 'Biden, Joseph', 'Bierce, Ambrose', 'Biko, Steve', 'Billings, Josh', 'Biondo, Frank', 'Birrell, Augustine', 'Black Elk', 'Blair, Robert', 'Blair, Tony', 'Blake, William'];
  
    const  fifteen = inventors.filter(inventor => (inventor.year >= 1500 && inventor.year < 1600));
    console.table(fifteen); 

    const fullNames = inventors.map(inventor => `${inventor.first} ${inventor.last}`)
    console.log(fullNames);

    const ordered = inventors.sort((a,b) => a.year > b.year ? 1 : -1);

    console.table(ordered);

    const totalYears = inventors.reduce((total,inventor) => {
      return total + (inventor.passed =inventor.year)
    },0)

    console.log(totalYears)

    const oldest = inventors.sort(function(a,b){
      const lastInventor = a.passed - a.year;
      const nextInventor = b.passed - b.year;
      return lastInventor > nextInventor ? -1 : 1;
    });
    console.table(oldest);

    const alpha = people.sort((lastOne,nextOne) => {
      const [aLast,aFirst] = lastOne.split(',');
      const [bLast,bFirst] = nextOne.split(',');
      return aLast > bLast ? 1 : -1;
    })
    console.log(alpha);


    const data = ['car', 'car', 'truck', 'truck', 'bike', 'walk', 'car', 'van', 'bike', 'walk', 'car', 'van', 'car', 'truck', 'pogostick']
    

    // 去重
    const transportation = data.reduce(function(obj,item){
      if (!obj[item]){
        obj[item] = 0
      }
      obj[item] = 0;
      return obj;
    },{})

    console.log(transportation)
  }
  
  

  render() {
    return (
      <div> Have a look at the JavaScript Console </div>
    );
  }
}

export default App;

```


```js

import React, { Component } from 'react';

class App extends Component {

  constructor(props){
    super(props);
    this.state={
      
    }
  }

  makeGreen = () => {
    const p = document.querySelector('p');
    p.style.color = "#BADA55";
    p.style.fontSize = "50px";
  }
  
  componentDidMount(){
    const dogs = [{ name: 'Snickers', age: 2 },{ name : "hugo",age : 8 }]

    console.log('hello')

    console.log('Hellp I am a %s string!', '💩')

    console.warn('OH NOOO')

    console.error('shit!')

    console.info('Crocodiles eat 3-4 people per year')

    const p = document.querySelector('p');

    console.assert(p.classList.contains('ouch'),'That is wrong')

    console.clear();

    console.log(p);

    console.dir(p);

    console.clear();

    dogs.forEach(dog => {
      console.groupCollapsed(`${dog.name}`);
      console.log(`This is ${dog.name}`);
      console.log(`${dog.name} is ${dog.age} years old`);
      console.log(`${dog.name} is ${dog.age * 7} dog years old`);
      console.groupEnd(`${dog.name}`);
    })

    console.count('Wes');
    console.count('Wes');
    console.count('Steve');
    console.count('Steve');
    console.count('Wes');
    console.count('Steve');
    console.count('Wes');
    console.count('Steve');
    console.count('Steve');
    console.count('Steve');
    console.count('Steve');
    console.count('Steve');

    console.time('fetching data')
    fetch('https://api.github.com/users/wesbos')
      .then(data => data.json())
      .then(data => {
        console.timeEnd('fetching data');
        console.log(data)
      })

    console.table(dogs);  
  }



  render() {
    return (
      <div>
        <p onClick={this.makeGreen}>console</p>
      </div>
    );
  }
}

export default App;

```

