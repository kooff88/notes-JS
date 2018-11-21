# 目录

- [验证码点击切换](#验证码点击切换)
- [设置密码不一致验证](#设置密码不一致验证)
- [用...省略多余字符](#用...省略多余字符)
- [链接问题<a></a>](#链接问题<a></a>)
- [react中super用法](#react中super用法)
- [javascript:伪协议问题](#javascript:伪协议问题)
- [遍历dom树](#遍历dom树)
- [取到上一页面传过来的参数](#取到上一页面传过来的参数)
- [加载 404页面](#加载 404页面)
- [数据传输到后台](#数据传输到后台)
- [上传图片](#上传图片)
- [mountNode is not defined](#mountNode is not defined)
- [package.json一些问题](#package.json一些问题)
- [antd版本升级遇到各种问题](#antd版本升级遇到各种问题)
- [antd Button问题](#antd Button问题)
- [antd datePicker问题](#antd datePicker问题)
- [antd setFieldsValue问题](#antd setFieldsValue问题)
- [pureComponent](#pureComponent)
- [dangerouslySetInnerHTMl](#dangerouslySetInnerHTMl)

# 验证码点击切换
    ```
    ...
    constructor(props) {
        super(props);
        this.state={
          url:`/yan?${new Date().getTime()}`
        }
      }

    ...

    onClickCaptcha(){
        this.setState({
          url:`/yan?${new Date().getTime()}`
        })
      }

    ...

    <img src={this.state.url} onClick={this.onClickCaptcha.bind(this)}/>

    ```

# 设置密码不一致验证
    ```
    A(e) {
        const value = e.target.value;   // e.target.value获取的就是你选择接受事件的元素输入的或者选择的值。
        this.setState({ passwordDirty: this.state.abc || !!value }); //你不需要用 setState，可以使用 this.props.form.setFieldsValue 来动态改变表单值
      }
    checkConfirm(rule, value, callback) {
        const form = this.props.form;
        if (value && this.state.abc) {   
          form.validateFields(['confirm'], { force: true });//validateFields:校验并获取一组输入域的值;;  force:true  获取焦点为真
        }
        callback();
      }

    checkPassword(rule, value, callback) {
        if (value && value !== this.props.form.getFieldValue('newPassword')) {
          callback('密码不一致');
        } else {
          callback();
        }
      }
       
      render(){
        const {  getFieldProps, getFieldError, isFieldValidating } = this.props.form;
        const confirmProps = getFieldProps('confirm', {
          rules: [
            { required: true, whitespace: true, min: 6, max: 30,message: '密码长度6-30位'  },
            {validator: this.checkConfirm.bind(this)}   //------------------>>>>bind(this) 是react新版本必须有的  老版本不要！！！！
          ],
        });
     .....
    ```

# 用...省略多余字符

    ```
        function textCut(txt,num){
              if(txt.length>num){
                txt = txt.substr(0,num) + "...";
              }
              return txt;
        }
        textCut(text,5)
    ```

# 链接问题<a></a>

        ```
        this.state ={
          refund_url:"",
        }
        ...
        renderbuttonListView_op(el,key){
            return(
                <div >
                    <Modal title="Basic Modal" visible={this.state.visible}>
                        <p>请点击链接</p>
                        <a href={this.state.refund_url}>{this.state.refund_url}</a>    
                                 >>>>这里的{this.state.refund_url} 不需要拼接 取出来的链接应该是完整的，点击直接到新地址
                    </Modal>
                </div>
            )
        }
        ```



# react中super用法

    ```
      class Todo extends Component{
          constructor(props){
              super(props)
          }
      }
      super(props)
      <---
      解释一： extends 表示从父类继承，constructor 里的 super 表示父类的构造函数。
      解释二： 在子类的构造函数中，只有调用super之后，才可以使用this关键字，否则会报错。
             这是因为子类实例的构建，是基于对父类实例加工，只有super方法才能返回父类实例。
            --->
      this.props.A  调父及 属性
      this.refs.A  调子集属性
      ...this.props   传出所有属性
    ```

# javascript:伪协议问题    
    
      ```
       <a href="javascript:;"></a>    javascript: 是一个伪协议，其他的伪协议还有 mail:  tel:  file:  等等。
       javascript:是表示在触发<a>默认动作时，执行一段JavaScript代码，而 javascript:; 表示什么都不执行，这样点击<a>时就没有任何反应。
      ```  


#  遍历dom树

      ```
      renderbuttonListView_op(el,key){
      const { loading, selectedRowKeys } = this.state;
      var selectbutton_op = this.state.buttonSelect_op === key ? 'primary':'';
      const  hasSelected = (selectedRowKeys.length == 1);
      return(
          <div key={key}>                         >>>>>>>>>>这里的key做为节点稳定标示（必须有） 当对dom树进行循环时 没有key react无法识别特定的字节点 
          <Button 
            onClick={()=>el.onClick(key)}
            type={selectbutton_op} key={key}
            disabled={!hasSelected}
          >{el.text}</Button>
          <Modal title="" visible={this.state.visible}
          onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}>
            <p>请点击链接地址：</p>
            <p>{this.state.refund_url}</p>
          </Modal>
          </div>
        )
      }
      <ButtonGroup style={{marginBottom:"10px"}} size="large" >
          {Array.from(this.state.buttonList_op, (el, i) => this.renderbuttonListView_op(el, i))}
      </ButtonGroup>
      ```

      ```    
      example1:
      const numbers = [1,2,3,4,5];
      const listItems = numbers.map((number) =>
        <li key = {number.toString}>
          {number}
        </li>
      )

      example2:

      const todoItems = todos.map((todo) =>
        <li key={todo.id}>
          {todo.text}
        </li>
      )

      example3:

      const todoItems = todos.map((todo,index) =>
        <li key={index}>
          {todo.text}
        </li>
      )


      example4:  组件中提取key
      function ListItem(props) {
        // Correct! There is no need to specify the key here:
        return <li>{props.value}</li>;
      }

      function NumberList(props) {
        const numbers = props.numbers;
        const listItems = numbers.map((number) =>
          // Correct! Key should be specified inside the array.
          <ListItem key={number.toString()}
                    value={number} />
        );
        return (
          <ul>
            {listItems}
          </ul>
        );
      }

      const numbers = [1, 2, 3, 4, 5];
      ReactDOM.render(
        <NumberList numbers={numbers} />,
        document.getElementById('root')
      );

      example5 :Keys used within arrays should be unique among their siblings.
      However they don't need to be globally unique.
      We can use the same keys when we produce two different arrays

      function Blog(props) {
        const sidebar = (
          <ul>
            {props.posts.map((post) =>
              <li key={post.id}>
                {post.title}
              </li>
            )}
          </ul>
        );
        const content = props.posts.map((post) =>
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </div>
        );
        return (
          <div>
            {sidebar}
            <hr />
            {content}
          </div>
        );
      }

      const posts = [
        {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
        {id: 2, title: 'Installation', content: 'You can install React from npm.'}
      ];
      ReactDOM.render(
        <Blog posts={posts} />,
        document.getElementById('root')
      );
      ```



# 取到上一页面传过来的参数

    ```
    var $ = $ || {}; 
    $.getParam = function( key, strURL ){
        strURL = strURL || window.location.search;
        return new RegExp( "(^|\\?|&)" + key + "=([^&]*)(\\s|&|$)", "i" ).test( strURL ) ? decodeURIComponent( RegExp.$2.replace( /\+/g, " " ) ) : "";
    };
    $.getParam（）；
    ```

# 加载 404页面 

    ```
    import Notfound from './containers/404';
    export default class Routes extends Component {
        render(){
          return(
            <Router history={browserHistory} >
              <Route path="/*" component={Notfound}/>     =====>>>>>找不到的页面加载404
            </Router>
          )
        }
    }
    ```  

#  数据传输到后台

    ```
     this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        this.setState({ loading: false });
        return;
      }
      axios.post('/api/signin', { 
        "mobile":values.name, 
        "password":values.passwd,
      }).then((response)=>{
        response = response.data;
        if(response.code === 0 ){
          message.success(response.message);
          localStorage.setItem('a',response.token);
          localStorage.setItem('b',JSON.stringify(response.data));
          this.props.updateToken(response.token,response.data)
          browserHistory.push('/home');
        }else{
          message.error(response.message);
          this.setState({ loading: false });
        }
      })
      .catch((error)=>{
        console.log('request failed', error); //
        message.error(error);
        return { error };
      });
    ```

#  上传图片  

    ```
    例一：
    this.state{
      fileList:[]
    }
    ...

    fileList.push({
            uid: -(num),      //文件唯一标示，设置为负数，防止和内部产生的ID 冲突
            name:dt.name,     //文件名
            status: 'done',   //状态: 4种  uploading  done   error   removed
            url:item,
          })
    ...

    <Upload {...uploadProps} disabled={uploadButton} fileList={this.state.fileList}>   >>>>fileList 是显示图片属性
              <div>
                 <Icon type="plus" />
                 <div className="ant-upload-text"><p>上传图片</p></div>
              </div>
    </Upload>

    例二：
    class PicturesWall extends React.Component {
      state = {
        previewVisible: false,
        previewImage: '',
        fileList: [{
          uid: -1,
          name: 'xxx.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        }],
      };

      handleCancel = () => this.setState({ previewVisible: false })

      handlePreview = (file) => {
        this.setState({
          previewImage: file.url || file.thumbUrl,
          previewVisible: true,
        });
      }

      handleChange = ({ fileList }) => this.setState({ fileList })   --》这里选择好图片进行显示图片
      render() {
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
          <div>
            <Icon type="plus" />
            <div className="ant-upload-text">Upload</div>
          </div>
        );
        return (
          <div className="clearfix">
            <Upload
              action="/upload.do"
              listType="picture-card"
              fileList={fileList}
              onPreview={this.handlePreview}
              onChange={this.handleChange}
            >
              {fileList.length >= 3 ? null : uploadButton}
            </Upload>
            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </div>
        );
      }
    }
    ```

# mountNode is not defined
    ```
    ReactDOM.render(<App />,  document.getElementById('root')); 
    ReactDOM.render(<App />,  mountNode);  ----->>>>  mountNode是react将<App/>传送的目标 必须给除目标
    ```

# package.json一些问题
    概念：
    每个项目的根目录下面，一般都有一个package.json文件，定义了这个项目所需要的各种模块，以及项目的配置信息（比如名称、版本、许可证等元数据）。
    npm install命令根据这个配置文件，自动下载所需的模块，也就是配置项目所需的运行和开发环境。
    package.json文件可以手工编写，也可以使用npm init命令自动生成。
    只有项目名称 name 和项目版本 version 是必填的，其他都是选填的。

# antd版本升级遇到各种问题
    ant design 1.0版本已经停止更新； 目前应使用2.0及以上版本
    项目升级过程遇到一些问题：
1:日期时间问题   timepicker属性 value,defaultvalue的type都改为moment 
  ```
  time = moment(time,"HH:mm");
  ```
        
2:获取节点属性     弃用getFieldProps   应用getFieldDecorator
```
const sid={initialValue:id};
...
{getFieldDecorator('sid',sid)(
  <div>{id}</div>
)} 
  ```

弃用代码:
```
const sidProps = getFieldProps({initialValue:id});
 <Input {...sidProps}/>
```

3:Input.Search 在2.5版本及以上可以使用  
```
<Search
  id="search"
  placeholder="关键词搜索"
  style={{ width: 200 }}
  onSearch={this.a.bind(this)}
  onPressEnter={this.a.bind(this)}
/>
```

4:Menu  height需写入
```
<Menu theme="dark" mode="horizontal"
   style={{lineHeight: '64px',height:64}}>
</Menu>
```
      
5: Warning: Each record in table should have a unique `key` prop,or set `rowKey` to an unique primary key
    solve:
```
antd2.0以上要求 Table 每条record都有`key`
对于取出的每一条record都加上`key`
  for(var i = 0;i<data.length;i++){
    data[i].key = i;
  }
```

#  antd Button问题  

    ```
    import { Button } from 'antd';

    ReactDOM.render(
      <div>
        <Button type="primary">Primary</Button>
        <Button>Default</Button>
        <Button type="ghost">Ghost</Button>
        <Button type="dashed">Dashed</Button>
      </div>
    , mountNode);
    Button 不是Submit 按钮   点击enter 不会获得焦点
    ```


#  antd datePicker问题  

```
<RangePicker
    defaultValue={[moment('2015/01/01', dateFormat), moment('2015/01/01', dateFormat)]}－－－－》》默认值格式 数组
    format={dateFormat}
/>
```


#  antd setFieldsValue问题   

```
 onchangetimepicker(rule, value, callback){
   console.log("--onchangetimepicker->")
   const form = this.props.form;
   form.setfieldsvalue({   －－－－－－－－－－－－－－－》》》》json格式
     "time_end":value
   })
   this.setstate({
     validatorTime:this.state.validatorTime || !!value
   })
 }
```


## pureComponent

-   默认渲染行为的问题
```


  在 React Component的生命周期中，有一个shouldComponentUpdate方法。这个方法默认返回值是true.
  这意味了就算没有改变组件的props或者state,也会导致组件的重绘。这就是经常导致组件因为不相关数据的改变
  导致的重绘，这极大的降低了React的渲染效率。比如下面的例子中，任何options的变化，甚至是其他数据的变化
  都可能导致所有的cell重绘。


  // Table Component
  {
    this.props.items.map(i =>{
      <Cell data={i} option={this.props.options[i]}>
    })
  }

  为了避免这个问题，我们可以在Cell中重写shouldComponentUpdate方法，只在option发生改变时进行重绘。

  class Cell extends React.Component {
    shouldComponentUpdate(nextProps,nextState){
      if(this.props.option === nextProps.option){
        return false;
      }else{
        return true;
      }
    }
  }

  这样每个Cell只有在关联option发生变化时进行重绘。

```

- 使用PureComponent与immutable.js  
```
  因为上面的情况十分通用，React创建了PureComponent组件创建了默认的shouldComponentUpdate行为。
  这个默认的shouldComponentUpdate行为会一一比较props和state中所有的属性，只有当其中一项发生
  改变时，才进行重绘。

  需要注意的是，PureComponent 使用浅比较判断组件是否需要重绘。

  因此，下面对数据的修改并不会导致重绘(假设Table也是PureComponent)

  options.push(new Options())
  options.splice(0,1)
  options[i].name = 'Hello'

  这些例子都是在原对象上进行修改，由于浅比较是比较指针的异同，所以会认为不需要进行重绘。

  为了避免出现这些问题，推荐使用immutable.js.immutable.js会在每次对原对象进行添加，删除，修改使返回
  新的对象实例。任何对数据的修改都会导致数据指针的变化。
```


## dangerouslySetInnerHTMl

```
dangerouslySetInnerHTMl 是React标签的一个属性，类似于 angular的ng-bind;

听说这个单词这么长，是故意的，应为有可能不合时宜的使用innerHTML会导致XSS攻击(然而我并不懂什么是XSS)，

__html:DOM;


通常写法:

    var HelloMessage = React.createClass({
      render:<div dangerouslySetInnerHTMl=({__html:'<h3>hahahaha</h3>'}) ></div>
    })

也可以插入字符串:

    var HelloMessage = React.createClass({
      render:<div dangerouslySetInnerHTMl={{__html:'hahahaha>'}} ></div>
    })

之所以是有2个{{}}，是因为第一{}代表jsx语法开始，第二个是代表dangerouslySetInnerHTML接收的是一个对象键值对
```
