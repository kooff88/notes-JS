const rootNode = document.getElementById('app');
const root = ReactDOM.createRoot(rootNode);


console.log(root)

let counterName = 'One';
// root.render(React.createElement(App));
root.render(<App />);

class CounterObj {
  constructor(name, show, total, id, tab) {
    this.name = name;
    this.show = show;
    this.total = total;
    this.id = id;
    this.tab = tab;
  }
}

// const counterData = [
//   new CounterObj('A', true, 0, 1),
//   new CounterObj('B', true, 0, 2),
//   new CounterObj('C', true, 0, 3),
// ]



function counterReducer(counterData, action) {
  switch (action.type) {
    case 'increment': {
      return counterData.map((counter) => {
        if (counter.id === action.id) {
          return { ...counter, total: counter.total + 1 }
        } else {
          return counter;
        }
      })
    }
    case 'decrement': {
      return counterData.map((counter) => {
        if (counter.id === action.id) {
          return { ...counter, total: counter.total - 1 }
        } else {
          return counter;
        }
      })
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

function tabReducer(visibleTab, action) {
  console.log('action-<action', action);
  switch (action.type) {
    case 'change-tab': {
      if (action.tab === visibleTab) {
        return visibleTab;
      } else {
        return action.tab;
      }
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

const CounterContext = React.createContext(null);
const CounterDispatchContext = React.createContext(null);
const TabContext = React.createContext(null);
const TabDispatchContext = React.createContext(null);

async function fetchBio(person) {
  const delay = person === 'Bob' ? 2000 : 200;

  return new Promise(resolve => {
    setTimeout(() => {
      resolve('This is ' + person + '‘s bio.')
    }, delay)
  })

}

// const CounterContext = React.createContext(3);

function App() {


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

  const [counterData, counterDispatch] = React.useReducer(counterReducer, [
    new CounterObj('A', true, 0, 1, 1),
    new CounterObj('B', true, 0, 2, 2),
    new CounterObj('C', true, 0, 3, 1),
  ])

  const [visibleTab, tabDispatch] = React.useReducer(tabReducer, 1);


  // const increment = (index) => {
  //   const newData = [...counterData];
  //   newData[index].total = newData[index].total + 1;
  //   setCounterData(newData);
  // }

  // const decrement = (index) => {
  //   const newData = [...counterData];
  //   const decrementedCounter = newData[index].total - 1;
  //   newData[index].total = decrementedCounter >= 0 ? decrementedCounter : 0;
  //   setCounterData(newData)
  // }

  // const contextData = [counterData, increment, decrement]

  return <>
    <CounterContext.Provider value={counterData}>
      <CounterDispatchContext.Provider value={counterDispatch}>
        <TabContext.Provider value={visibleTab}>
          <TabDispatchContext.Provider value={tabDispatch}>
            <h1>Counters</h1>
            <section>
              {counterOne}
            </section>
            <p>
              <button className="button" onClick={handleClick}>Swap counters</button>
            </p>
            <CounterList />
            <CounterTools />
          </TabDispatchContext.Provider>
        </TabContext.Provider>
      </CounterDispatchContext.Provider>
    </CounterContext.Provider>

  </>
}


function CounterList() {

  const counterData = React.useContext(CounterContext);

  return (
    <section>
      {counterData.map((counter, index) => {
        return (
          <Counter key={counter.id} counter={counter} />
        )
      })}
    </section>
  )
}

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

function Counter({ counter, index }) {

  // const [counter, incrementCounter] = useCounter();

  const counterDispatch = React.useContext(CounterDispatchContext);

  const id = React.useId();


  // function handleClick() {
  //   setNumOfClicks({ ...numOfClicks, total: numOfClicks.total + 1 })
  // }

  function handleIncrementClick(event) {
    counterDispatch({ type: 'increment', id: counter.id });
    // increment(index);
    event.preventDefault();
  }

  function handleDecrementClick(event) {
    counterDispatch({ type: 'decrement', id: counter.id });
    // decrement(index);
    event.preventDefault();
  }

  return (
    <fieldset className="counter" id={id}>
      <legend className="counter__legend">{counter.name}</legend>
      <dd className="counter_value">
        <button className="button" onClick={handleDecrementClick}>-</button>
        {counter.total}
        <button className="button" onClick={handleIncrementClick}>+</button>
      </dd>
    </fieldset>
  )


}

function Counter2(props) {

  const [numOfClicks, setNumOfClicks] = React.useState({
    total: 0
  });

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

function CounterTools() {

  return (
    <CounterSummary />
  )

}

function CounterSummary() {

  // const [contextData, increment, decrement] = React.useContext(CounterContext)

  const counterData = React.useContext(CounterContext);

  const visibleTab = React.useContext(TabContext);

  const tabDispatch = React.useContext(TabDispatchContext);

  console.log('counterDatacounterData================', counterData);
  // const [visibleTab, setVisibleTab] = React.useState(1);

  // const sortedData = [...counterData].sort((a, b) => {
  //   return b.total - a.total;
  // })
  const filteredSortedData = React.useMemo(() => {
    return counterData.filter((counter) => {
      return counter.tab === visibleTab
    })
  }, [visibleTab, counterData])

  const setVisibleTab1 = React.useCallback((event) => {
    // setVisibleTab(1) 
    tabDispatch({ type: 'change-tab', tab: 1 });
    event.preventDefault();
  }, [])


  const setVisibleTab2 = React.useCallback((event) => {
    tabDispatch({ type: 'change-tab', tab: 2 });
    event.preventDefault();
  }, [])

  return (
    <section>

      <CounterSummaryHeader setVisibleTab1={() => setVisibleTab1(1)} setVisibleTab2={() => setVisibleTab2(2)} />
      {filteredSortedData.map((counter, index) => <CounterSummaryDetail visible={visibleTab} key={counter.id} counter={counter} />)}

    </section>
  )
}

const CounterSummaryHeader = React.memo(function CounterSummaryHeader({ setVisibleTab1, setVisibleTab2 }) {
  console.log('CounterSummaryHeader')
  return (
    <header>
      <a href="#" onClick={setVisibleTab1}>Tab 1</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="#" onClick={setVisibleTab2}>Tab 2</a>
    </header>
  )
})


const CounterSummaryDetail = React.memo(function CounterSummaryDetail({ counter, visible }) {
  if (visible) {
    return (
      <p>{counter.name} ({counter.total})</p>
    )
  }
  return null;

})



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