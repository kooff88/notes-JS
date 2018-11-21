# 拖拽上传

文件: dragdrop.js  dragdrop.less  

```
import React, { Component } from 'react';
import { Icon,Button } from 'antd';
import './dragdrop.less';

class DragDropUpload extends Component {
  constructor(props){
    super(props);
    this.state = {
      files:[],
    }
    this.dragOverIndex = null;

    this.onChange = this.onChange.bind(this);
    this.renderPreview = this.renderPreview.bind(this);
    this.onRemove = this.onRemove.bind(this);
  }

  componentDidMount(){
    this.dragdropRef.addEventListener("dragover",function(event){
      event.preventDefault();
    },false)

    this.dragdropRef.addEventListener("drop",(event)=>{
      let items = event.dataTransfer.files;
      event.preventDefault();
      for(let i = 0; i < items.length; i++){
        this.scanFiles(items[i],this.listing);
      }
    },false)
  }



  scanFiles(item,container){
    let reader = new FileReader();

    reader.onloadend = (e) => {
      let {files} = this.state;
      files.push({name:item.name,value:e.target.result});
      this.setState({files})
    }
    reader.readAsDataURL(item);
  }

  onChange(e){
    let items = e.target.files;
    for(let i = 0;i < items.length; i++){
      this.scanFiles(items[i],this.listing)
    }
  }

  onRemove(index){
    let { files } = this.state;
    files.splice(index,1);
    this.setState({files})
  }

  renderPreview(){
    return this.state.files.map((file,index)=>{
      return(<li key={`preview-key-${index}`} data-index={index} draggable
        onDragEnd={(e)=>{
          let {files} = this.state;
          if(this.dragOverIndex === (null || index)) return;
          let file = files[index];
          files.splice(this.dragOverIndex,0,file);
          this.dragOverIndex < index ? files.splice(index + 1, 1) : files.splice(index,1);
          this.dragOverIndex = null;
          this.setState({files})
        }}
        onDrop={(e)=>{
          let dataset = e.target.dataset || { dragOverIndex:null };
          this.dragOverIndex = dataset.index;
        }}
      >
        <div data-index={index} style={{ backgroundImage:`url(${file.value})` }}></div>
        <p data-index={index}>
          <span>{file.name}</span>
          <Icon type="delete" onClick={()=>{
            this.onRemove(index)
          }}/>
        </p>
      </li>
      )}
    )
  }

  render(){
    return(
      <div className="z-dd-upload">
        <div className="z-dd-upload-wrap" ref={(node)=>{ this.dragdropRef = node;}}>
          <Button
            loading={this.props.loading}
            disabled={this.props.disabled}
            size="large"
            type="primary"
            onClick={()=>{
              this.fileRef.click();
            }}
          >
            <Icon type="cloud-upload-o" />拖拽或点击上传
          </Button>
          <input type="file" onChange={this.onChange} ref={(node)=>{ this.fileRef = node; }}/>
          <p>只能上传png、gif、jpg格式图片，并不超过10M</p>
          <ul className="z-dd-list" ref={(node)=>{ this.listing = node; }}>
            {this.renderPreview()}
          </ul>
        </div>
      </div>
    )
  }
}

export default DragDropUpload;
```

```css
  @z-dd : ~"z-dd";

.@{z-dd}-upload{
  text-align: center;
  width: 100%;
  padding : 10%;
  border: 1px dashed #bbb1b1;
  border-radius: 5px;
  background: #f1ebeb;
  margin-top: 20%;
  
  &-wrap{
    text-align: center;
    > button {
      border-color: #f1ebeb;
      &:hover,&:active,&:visible{
        background-color:transparent;
        box-shadow: none;
        border-color:#2f84ff;
      }
      &:hover{
        i,span {
          color:#2f84ff;
        }
      }
      span{
        font-size: 12px;
        color: #cac0c0;
        line-height: 24px;
        vertical-align: bottom;
        i[class^="w-icon"]{
          font-size: 24px;
          margin-right: 5px;
        }
      }
    }
    > span {
      font-size: 12px;
      color: #717171;
    }
    > input[type="file"]{
      display: none;
    }
    > p{
      font-size: 12px;
      color: #cac0c0;
      font-weight: lighter;
    }
    ul {
      text-align: left;
      margin-top: 8px;
      li {
        display: inline-block;
        width: 120px;
        height: 100px;
        border-radius: 5px;
        border: 2px solid white;
        position: relative;
        overflow: hidden;
        margin-right: 8px;
        &:hover{
          cursor: all-scroll;
          p {
            opacity: 1;
          }
        }
        > div{
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
        > p{
          position: absolute;
          transition: all .3s;
          opacity: 0;
          top:0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,.3);
          text-align: center;
          span{
            display: block;
            color:white;
            font-size: 12px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          i{
            position: relative;
            color:white;
            font-size: 16px;
            padding: 10px;
            display: inline;
            &:hover{
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}
```

