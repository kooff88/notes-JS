# 目录

[组件](#组件)
[flex布局](#flex布局)
[方法](#方法)
[同时render多个TouchableOpacity](#同时render多个TouchableOpacity)
[web页面启用debugger进行开发](#web页面启用debugger进行开发)
[组件Dimensions](#组件Dimensions)
[组件Animated.View](#组件Animated.View)
[软键盘事件监听及销毁](#软键盘事件监听及销毁)
[打开外部链接](#打开外部链接)

react.native 
# 组件：
 AsyncStorage（缓存仓库） ：已键值对 储存数据
 
      ```
      let UID123_object = {
          name:'Chris',
          age:30,
          traits:{hair:'brown',eyes:'brown'},
      };
      // You only need to define what will be added or updated
      let UID123_delta = {
          age:31,
          traits:{eyes:'blue',shoe_size:10}
      };
      AsyncStorage.setItem('UID123',JSON.stringify(UID123_object),()=>{
          AsyncStorage.mergeItem('UID123',JSON.stringify(UID123_delta),()=>{
              AsyncStorage.getItem('UID123',(err,result)=>{
                  console.log(result);
              })
          })
      })
      // result => {
            'name':'Chris','age':31,'traits':{'shoe_size:10','hair':'brown','eye':'blue'}
            }

      AsyncStorage.removeItem('UID123',(err)=>{
          if(err){
              alert('缓存清空失败');
          }
      })     
    ```



 navigator : 导航器 
    for example:
    
    
    ``` 
     export default class NavAllDay extends Component {
      render() {
        return (
          <Navigator
            initialRoute={{ title: 'Awesome Scene', index: 0 }}
            renderScene={(route, navigator) =>
              <Text>Hello {route.title}!</Text>
            }
            style={{padding: 100}}
          />
        );
      }
    }
    ```
   navigator.push(routes[1]);  添加一个可以跳转的地址（api）
   navigator.pop();   返回前面

 TextInput
 <TextInput
    value={this.state.form.username} style={{flex:1}}
    autoFocus={true}
    autoCapitalize='none'
    onChangeText={(text) => {
      var form = this.state.form;
      form.username = text;
      this.setState({form});
    }}
    placeholder="请输入手机号码"  /> 


 DeviceEventEmitter
     import{
         DeviceEventEmitter
     } 

     添加 DeviceEventEmitter
     componentDidMount(){
        this.subscription = DeviceEventEmitter.addListener('userNameDidChange',(userName)=>{
                alert('通知')
        })
     } 
     编辑 DeviceEventEmitter
        DeviceEventEmitter.emit('userNameDidChange',data);
     移除 DeviceEventEmitter
         componentWilllUnmount(){
            this.subscription.remove();
         }
     发送通知
     DeviceEventEmitter.emit('userNameDidChange','通知来了');




#  flex布局

     采用Flex布局的元素，称为Flex容器（flex container），简称"容器"。它的所有子元素自动成为容器成员，称为Flex项目（flex item），简称"项目"。
     容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。主轴的开始位置（与边框的交叉点）叫做main start，结束位置叫做main end；交叉轴的开始位置叫做cross start，结束位置叫做cross end。
    项目默认沿主轴排列。单个项目占据的主轴空间叫做main size，占据的交叉轴空间叫做cross size。

   flex属性(6个)：

      flex-direction ：决定主轴的方向(即项目的排列方向).
           ```
            .box{
                flex-direction : row | row-reverse | column | column-reverse
            }
           ```
            row（默认值）：主轴为水平方向，起点在左端。
            row-reverse：主轴为水平方向，起点在右端。
            column：主轴为垂直方向，起点在上沿。
            column-reverse：主轴为垂直方向，起点在下沿。
        
        flex-wrap: 默认情况下，项目都排在一条线（又称"轴线"）上。flex-wrap属性定义，如果一条轴线排不下，如何换行。
            ```
            .box{
              flex-wrap: nowrap | wrap | wrap-reverse;
            }
            ```
            nowrap(默认):不换行
            wrap: 换行，第一行在上方
            wrap-reverse:换行，第一行在下方
            
        flex-flow: 是flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap
            ```
            .box {
                flex-flow: <flex-direction> || <flex-wrap>;
            } 
            ```

        justify-content：定义了项目在主轴上的对齐方式
            ```
            .box {
               justify-content:flex-start | flex-end | center | space-between | space-around 
            } 
            ```  
            flex-start（默认值）：左对齐
            flex-end：右对齐
            center： 居中
            space-between：两端对齐，项目之间的间隔都相等。
            space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。

        align-items:定义项目在交叉轴上如何对齐
            ```
            .box {
              align-items: flex-start | flex-end | center | baseline | stretch;
            } 
            ```
            flex-start:交叉轴的起点对齐
            flex-end:交叉轴的终点对齐
            center:交叉轴的中点对齐
            baseline:项目的第一行文字的基线对齐
            stretch(默认值) : 如果项目未设置高度或设为auto ,将占满整个容器的高度  

        align-content:定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用
            ```
            .box {
              align-content: flex-start | flex-end | center | space-between | space-around | stretch;
            }
            ```
            flex-start:与交叉轴的起点对齐.
            flex-end:与交叉轴的终点对齐.
            center:与交叉轴的中点对齐。
            space-between:与交叉轴两端对齐,轴线之间的间隔平均分布.
            space-around:每根轴线两侧的间隔都相等。所以，轴线之间的间隔与边框的间隔大一倍。
            stretch : 轴线占满整个交叉轴


# 方法

 componentDidMount（）：用于页面 组件刚加载时候好后调用

 componentWillMount()：用于 页面组建加载之前调用
                            
# 多个TouchableOpacity同时应用

  需要在最外层套一个<TouchableOpacity > 
  ```
  return (
      <TouchableOpacity >
        <TouchableOpacity  } >
            <View >
              <Text >预约</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity  >
            <View >
              <Text >预订</Text>
            </View>
        </TouchableOpacity>
      </TouchableOpacity>  
    )
   ``` 
   
# web页面启用debugger进行开发
 
    苹果mac 电脑  
    command+d:显示
       <br/>
       Reload
       <br/>
       Stop Remote JS Debugging
       <br/>
       Enable Live Reload
       <br/>
       Start Systrace
       <br/>
       Disable Hot Reloading 
       <br/>
       Show Inspector
       <br/>
       Show Perf Monitor
       <br/>
       Cancel 
       <br/> 
       
       选择  Stop Remote JS Debugging  模式 ＝＝》热加载 并且可以在 web 页面进行console.log,开发
        ```

## 组件Dimensions

-  译注：本模块用于获取设备屏幕的宽高。
- 例子：var {height, width} = Dimensions.get('window');



## 组件Animated.View    
-  举个栗子：
  ```
  constructor(props) {
    super(props);
    this.state={
      viewMarginTop: new Animated.Value(0),
    }
  }

  scrollViewToBottom(){
    Animated.timing(
      this.state.viewMarginTop,
      {
        toValue:this.state.keyboardHeight,
        duration:0,
      }
    ).start();
  }
  render{
    return(
      <Animated.View style={{height:50,width:50,backgroundColor:"red",marginBottom:this.state.viewMarginTop}}> 
        <Button onPress={this.scrollViewToBottom.bind(this)}></Button>   
      </Animated.View>
    )
  }
  
  ```

## 软键盘事件监听及销毁

  ```
  componentWillMount(){
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow',this._keyboardDidShow.bind(this));
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide',this._keyboardDidHide.bind(this));
  }

  componentWillUnmount(){
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow(e){
    console.log('aaa')
  }

  _keyboardDidHide(e){
    console.log('bbb')
  }

  ```

## 打开外部链接

```
  要启动一个链接相对应的应用(打开浏览器，邮件或者其他应用)
  Linking.openURL(url).catch(err =>console.error('An error occurred',err))

  如果想在打开链接前先检查是否安装了对应的应用，则调用以下方法
  Linking.canOpenURL(url).then(supported =>{
    if(!supported){
      console.log('Can\'t handle url' + url);
    }else{
      return Linking openURL(url);
    }
  }).catch(err => console.error('An error occurred',err))
```
