## umi版本3 一些API使用实录


### history

直接在 `UMI` 中 使用   `history`;
```ts

import React, { useState } from 'react';
import { Table } from 'antd';
import { history  } from 'umi'; 

const Info: React.FC<{}> = props => {

    // 跳转
    const gotoSomePage = () =>{
        history.push({
            pathname: "/otherpage",
            query:{ params:100 }
        });
    }

    return (
        <div    onClick={gotoSomePage}>info</div>

    )
}

export default Info;
```