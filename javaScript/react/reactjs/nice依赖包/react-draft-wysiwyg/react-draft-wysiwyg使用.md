# [react-draft-wysiwyg](https://github.com/jpuri/react-draft-wysiwyg)


react-draft-wysiwyg 结合ReactJs 和 DraftJs, 是一款比较优秀的富文本编辑器。  

## 简单使用

```js
	
import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import './index.less'


class EditorConvertToHTML extends Component {
  constructor(props) {
    super(props);
    const html = props.value ? props.value : '<p></p>';
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      this.state = {
        editorState,
      };
    }
  }

  onEditorStateChange = (editorState) => {
    const { onChange } = this.props;
    onChange && onChange(draftToHtml(convertToRaw(editorState.getCurrentContent())))
    this.setState({ editorState });
  };

  render() {
    const { editorState } = this.state;
    return (
      <div className="demo-section-wrapper">
        <div className="demo-editor-wrapper">
          <Editor
            editorState={editorState}
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            onEditorStateChange={this.onEditorStateChange}
          />
          {/* <textarea
              disabled
              className="demo-content no-focus"
              value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
            /> */}
        </div>
      </div>
    );
  }
}

export default EditorConvertToHTML;


```


```css
	:global{
  .demo-editor {
    margin-bottom: 30px;
    border: 1px solid #F1F1F1;
  }
}

```





