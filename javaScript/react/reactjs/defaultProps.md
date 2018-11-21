# defaultProps

- 在组件内部的使用static 

```
  import React from 'react'

  export default class Props extends React.Component {
    static defaultProps = {
      name: ...
    }

    render(){
      const {name} = this.props;
      return (
        ...
      )
    }
  }

```

- 在组件外部

```
  import React from 'react'

  export default class Props extends React.Component {
    render(){
      const {name} = this.props;
      return (
        ...
      )
    }
  }

  Props.defaultProps = {
    name:...
  }

```

