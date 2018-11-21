# [braft-editor](https://github.com/margox/braft-editor)

这是一个基于  [draft-js](https://draftjs.org/)的Web富文本编辑器，适用于React框架，兼容主流现代浏览器。 

## 简单封装使用

```js
	
import React, { Component } from 'react'

// 引入编辑器以及编辑器样式
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/braft.css'
import styles from './index.less'


class MyEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      length: this.props.length ? this.props.length : 100000,
      value: this.props.value ? this.props.value : ''
    }
  }

  /**
   * 获取编辑器内容
   */
  handleEditerHTMLChange = (value) => {
    const { onChange } = this.props;
    const { length } = this.state;
    if (value.length < length) {
      onChange && onChange(value);
      this.setState({ value })
    } else {
      this.setState({ value: value.substring(0, length) })
    }
  }

  /**
   * 上传图片调用
   */
  uploadFn = (param) => {
    // 上传图片的地址
    const serverURL = /upload.do`
    const xhr = new XMLHttpRequest()
    const fd = new FormData()
    console.log(param.libraryId)
    // libraryId可用于通过mediaLibrary示例来操作对应的媒体内容

    const successFn = (response) => {
      // 假设服务端直接返回文件上传后的地址
      // 上传成功后调用param.success并传入上传后的文件地址
      param.success({
        url: response,
        meta: {
          id: 'xxx',
          title: 'xxx',
          alt: 'xxx',
          loop: true, // 指定音视频是否循环播放
          autoPlay: true, // 指定音视频是否自动播放
          controls: true, // 指定音视频是否显示控制栏
          poster: 'http://xxx/xx.png', // 指定视频播放器的封面
        }
      })
    }

    const progressFn = (event) => {
      // 上传进度发生变化时调用param.progress
      param.progress(event.loaded / event.total * 100)
    }

    const errorFn = (response) => {
      // 上传发生错误时调用param.error
      param.error({
        msg: 'unable to upload.'
      })
    }

    xhr.upload.addEventListener("progress", progressFn, false)
    xhr.addEventListener("load", successFn, false)
    xhr.addEventListener("error", errorFn, false)
    xhr.addEventListener("abort", errorFn, false)

  

    fd.append('file', param.file)
    xhr.open('POST', serverURL, true)
    xhr.send(fd)
  }


  render() {
    let { value, length } = this.state;
    const editorProps = {
      contentClassName: "editor",
      initialContent: value,
      contentFormat: "html",
      language: "zh-cn",
      onHTMLChange: this.handleEditerHTMLChange,
      placeholder: "请输入文章内容",
      media: {
        image: true, // 开启图片插入功能
        video: false, // 开启视频插入功能
        audio: false, // 开启音频插入功能
        validateFn: null, // 指定本地校验函数，说明见下文
        uploadFn: this.uploadFn // 指定上传函数，说明见下文
      }
    }

    return (
      <div className={styles.box}>
        <BraftEditor {...editorProps} />
        <span>富文本长度 {value.length}/{length}</span>
      </div>
    )
  }
}

export default MyEditor;

```

```css
.box{
  :global{
    .BraftEditor-controlBar {
      border: 1px solid #bbb;
      
    }
    .DraftEditor-editorContainer {
      border: 1px solid #bbb;
    }
  }
}

```















