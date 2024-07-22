const rootNode = document.getElementById('app');
const root = ReactDOM.createRoot(rootNode);


console.log(root)

let counterName = 'One';
// root.render(React.createElement(App));
root.render(<App />);

class CounterObj {
  constructor(name, show, total) {
    this.name = name;
    this.show = show;
    this.total = total;
  }
}

const counterData = [
  new CounterObj('A', true, 0),
  new CounterObj('B', true, 0),
  new CounterObj('C', true, 0),
]


async function fetchBio(person) {
  const delay = person === 'Bob' ? 2000 : 200;

  return new Promise(resolve => {
    setTimeout(() => {
      resolve('This is ' + person + '‘s bio.')
    }, delay)
  })

}


function App() {
  // const counterOne = <Counter name={counterName} />
  // const counterTwo = <Counter2 name={counterName} />
  // const [person, setPerson] = React.useState('Alice');
  // const [bio, setBio] = React.useState(null);

  // React.useEffect(() => {
  //   let ignore = false;
  //   setBio(null);
  //   fetchBio(person).then(result => {
  //     if (!ignore) {
  //       setBio(result);
  //     }
  //   })

  //   return () => {
  //     ignore = true;
  //   }

  // }, [person])


  // return (
  //   <>
  //     <select value={person} onChange={e => {
  //       setPerson(e.target.value)
  //     }}>
  //       <option value="Alice">Alice</option>
  //       <option value="Bob">Bob</option>
  //       <option value="Taylor">Taylor</option>
  //     </select>
  //     < hr />
  //     <p> <i>{bio ?? 'Loading...'}</i> </p>
  //     {/* 如果bio是有值，否则展示loadinging */}
  //   </>
  // )

  const [swapCounter, setSwapCounter] = React.useState(false);




  function handleClick() {
    setSwapCounter(!swapCounter);
  }



  let counterOne = null;
  if (swapCounter) {
    counterOne = <Counter name="Two" />
  } else {
    counterOne = <Counter2 name="One" />
  }

  const [counterData, setCounterData] = React.useState([
    new CounterObj('A', true, 0),
    new CounterObj('B', true, 0),
    new CounterObj('C', true, 0),
  ])

  const increment = (index) => {
    const newData = [...counterData];
    newData[index].total = newData[index].total + 1;
    setCounterData(newData);
  }

  const decrement = (index) => {
    const newData = [...counterData];
    const decrementedCounter = newData[index].total - 1;
    newData[index].total = decrementedCounter >= 0 ? decrementedCounter : 0;
    setCounterData(newData)
  }

  return <>
    <h1>Counters</h1>
    // <section>
    //   {/* {counterName === "One" ? counterOne : counterTwo} */}
    //   {counterOne}
    // </section>
    <p>
      <button className="button" onClick={handleClick}>Swap counters</button>
    </p>
    <CounterList counterData={counterData} increment={increment} decrement={decrement} />
    <CounterSummary counterData={counterData} />
  </>
}


function CounterList({ counterData, increment, decrement }) {
  return (
    <section>
      {counterData.map((counter, index) => (
        <Counter counter={counter} index={index} increment={increment} decrement={decrement} />
      ))}
    </section>
  )
}

// function Counter() {
//   return React.createElement("article", null,
//     React.createElement("h2", null, "Counter"),
//     React.createElement("p", null, "You clicked 1 times"),
//     React.createElement("button", { className: 'button' }, "Click me"),
//   )
// }

function useDocumentTitle(title) {
  return React.useEffect(() => {
    const originalTitle = document.title;
    document.title = title;

    return () => {
      document.title = originalTitle
    }
  }, [title])
}

function useCounter() {
  const [counterVal, setCounterVal] = React.useState({ total: 0 });

  const increment = () => {
    setCounterVal({ ...counterVal, total: counterVal.total + 1 })
  }

  return [
    counterVal,
    increment
  ]

}

function Counter({ counter, index, increment, decrement }) {

  // const [counter, incrementCounter] = useCounter();

  const updateTitle = useDocumentTitle('Clicks: ' + counter.total)

  // React.useEffect(() => {
  //   const originalTitle = document.title;
  //   document.title = "Clicks: " + numOfClicks.total;;
  // }, [numOfClicks.total])

  // const numOfClicksRef = React.useRef({ total: 0 })

  function handleClick() {
    // numOfClicks.total = numOfClicks.total + 1;
    // alert(`you've clicked ${numOfClicks.total} times`)
    // setNumOfClicks({ ...numOfClicks, total: numOfClicks.total + 1 })
    incrementCounter();
  }



  function handleClickWrong() {
    numOfClicks.total = numOfClicks.total + 1;
    setNumOfClicks(numOfClicks)
  }

  // function handleClick() {
  //   setNumOfClicks({ ...numOfClicks, total: numOfClicks.total + 1 })
  // }

  function handleIncrementClick() {
    increment(index)
  }

  function handleDecrementClick() {
    decrement(index);
  }

  return <artical>
    <h2>Counter {counter.name}</h2>
    <p>you clicked {counter.total} times</p>
    {/* <button className="button" onClick={handleClickWrong}>Click me</button> */}
    {/* <button className="button" onClick={handleClick}>Click me</button> */}
    <button className="button" onClick={handleDecrementClick}> - </button>
    <button className="button" onClick={handleIncrementClick}> + </button>
  </artical>
}

function Counter2(props) {

  const [numOfClicks, setNumOfClicks] = React.useState({
    total: 0
  });


  // const [myName, setMyName] = React.useState('Tony');
  // const [state, dispatch] = React.useReducer(() => {

  // }, "Alicea");

  // const [num, setNum] = React.useState(0);

  // React.useEffect(() => {
  //   console.log("In Use Effect" + props.name);
  //   document.title = "Clicks: " + numOfClicks.total;

  //   return () => {
  //     console.log('Unmounting One' + props.name);
  //   }

  // }, [])


  function handleClickWrong() {
    numOfClicks.total = numOfClicks.total + 1;
    setNumOfClicks(numOfClicks)
  }

  function handleClick() {
    setNumOfClicks({ ...numOfClicks, total: numOfClicks.total + 1 })
  }

  return <artical>
    <h2>Counter {props.name}</h2>
    <p>you clicked {numOfClicks.total} times</p>
    <button className="button" onClick={handleClickWrong}>Click me</button>
    {/* ref访问真实dom节点 */}
    <button className="button" onClick={handleClick}>Click me</button>
  </artical>
}

function CounterSummary({ counterData }) {

  const summary = counterData.map((counter) => {
    return `${counter.name}(${counter.total})`
  }).join(',')

  return (
    <p>Summary: {summary}</p>
  )
}


// function Counter({ name }) {

//   const clickHandler = (event) => {
//     console.log("React handled click");
//     console.log(event);
//   }

//   const parentClickHandler = (event) => {
//     console.log("parentClickHandler handled click");
//     console.log(event);
//   }

//   const linkClickHandler = (event) => {
//     // event.preventDefault();
//     event.stopPropagation();
//     console.log("linkClickHandler handled click");
//     console.log(event);
//   }

//   return <artical onClick={parentClickHandler}>
//     <h2>Counter {name}</h2>
//     <p>you clicked 1 times</p>
//     <button className="button" onClick={clickHandler}>Click me</button>
//     <p>
//       <a href="http://www.baidu.com" target="_blank" onClick={linkClickHandler}>Understanding React</a>
//     </p>
//   </artical>
// }

rootNode.className = 'root';

// function Counter2({ name }) {
//   return <artical>
//     <h2>Counter {name}</h2>
//     <p>Times clicked: 1</p>
//     <button className="button">Click me</button>
//   </artical>
// }

// function rerender() {
//   console.log('rerender...')
//   counterName = "two";
//   root.render(React.createElement(App));

// }

// rootNode.addEventListener("click", function (event) {
//   if (event.target.tagName === 'BUTTON') {
//     console.log('Clicked button');
//   } else {
//     console.log("Didn't click button")
//   }
// })



// // console.log(App())
// // before react does its work
// let articalElements = document.getElementsByTagName('article');
// let articalElement = document.getElementsByTagName('artical').item(0);



// let counter = { name: 'Counter' };
// let counterValue = 1;

// function pureCounter(ctr, value) {
//   //  console.log(`${ctr.name} ${value}`)
//   return `${ctr.name} ${value}`
// }

// function notPureCounter(ctr, value) {
//   ctr.name = ctr.name + 'tony';
//   counterValue = counterValue + 1;
//   return `${ctr.name} ${value}`
// }

// // pureCounter(counter, counterValue);
// // pureCounter(counter, counterValue + 1);
// // pureCounter(counter, counterValue);
// console.log(pureCounter(counter, counterValue));
// console.log(pureCounter(counter, counterValue + 1));
// console.log(pureCounter(counter, counterValue));
// console.log('----')
// console.log(notPureCounter(counter, counterValue));
// console.log(notPureCounter(counter, counterValue + 1));
// console.log(notPureCounter(counter, counterValue));
// console.log(counter);