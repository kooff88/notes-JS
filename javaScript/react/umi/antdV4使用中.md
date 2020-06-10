## antd 4.2.0之后 react 16.13.1 之后 使用中问题记录


问题描述
antd: 4.2.0, react: 16.13.1

Modal 中使用 Form ，使用 React Hooks const [form] = Form.useForm(); 创建实例时，会出现以下警告。

``Waring`` :   `[Ant Design] Warning: Instance created by `useForm` is not connected to any Form element. Forget to pass `form` prop?`

原因
Modal 挂载的 HTML 节点默认为 document.body，页面初始化时，在当前模块下找不到 Form 表单。

解决方案
Modal 添加属性 getContainer={false} ，挂载在当前 dom。

实战代码:

`./modal.tsx`
```tsx
    ...

    <Modal
        title={"编辑信息"}
        visible={visible}
        footer={null}
        getContainer={false}  // 添加这一样 就可以了
    >
        ...
    </Modal>

    ...

```