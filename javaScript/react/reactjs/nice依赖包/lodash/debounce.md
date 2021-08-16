## lodash.debounce

`防抖` 

使用

```tsx
import React, { FC } from 'react';
import { Form, Row, Col, Input } from 'antd';
import debounce from 'lodash.debounce';

const { TextArea } = Input;
const FormItem = Form.Item;

interface DataProps {
  formRef: any;
}

const Example: React.FC<DataProps> = props => {
  const { formRef } = props;
  const [form] = Form.useForm();

  // form值改变回调
  const onValuesChange = (v: string) => {
    let values = form.getFieldsValue();
    values.title = values.title?.trimLeft();
    values.details = values.details?.trimLeft();
    form.setFieldsValue(values);
  };
  return (
    <div className={styles.base}>
      <Form
        form={form}
        name="baseRoad"
        onValuesChange={debounce(onValuesChange,200) }
        scrollToFirstError
        ref={formRef}
      >
        <Row>
          <Col span={24}>
            <FormItem
              name="title"
              label="活动标题"
              rules={[{ required: true, message: '请输入活动标题！' }]}
            >
              <Input placeholder="请输入活动标题" />
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              name="details"
              label="活动详情"
              rules={[
                { required: true, message: '请输入活动详情' },
                { type: 'string', max: 500, message: '组合策略最多为500字' }
              ]}
            >
              <TextArea rows={6} placeholder="请输入活动详情" />
            </FormItem>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Example;

```