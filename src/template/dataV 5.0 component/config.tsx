import { Collapse, Row, Col, Switch, InputNumber, Input, Select } from "antd";
import React, { useContext } from "react";
import { componentsContext } from "@/dataV/hooks/useComponents";

import ColorPicker from 'rc-color-picker';
import { Color } from '@/dataV/common';
import { colorToRgba } from '@/dataV/utils/gradients';

import OptionsStyles from "@/dataV/option.less";

export default () => {
  const { dispatchComponentList, component } = useContext(componentsContext);
  const { data1, data2, data3, data4, data5 } = component.options; // data1... 配置变量自行修改

  const handleValueUpdate = (value, target) => {
    dispatchComponentList({
      type: "updateComponents",
      options: {
        options: {
          [target]: value
        }
      }
    });
  };

  const handleColorOnChange = (value: Color) => {
    const { color, alpha } = value;
    // TODO
    // dispatchComponentList({
    //   type: 'updateComponents',
    //   options: {
    //     options: { color: colorToRgba(color, alpha / 100) }
    //   }
    // })
  };

  return (
    <Collapse
      bordered={false}
      expandIconPosition="right"
      defaultActiveKey={[1]}
    >
      <Collapse.Panel header="配置" key="1">
        <Row>
          <Col span={9}>
            <small>Switch 配置</small>
          </Col>
          <Col span={15}>
            <Switch
              size="small"
              checked={data1}
              onChange={value => handleValueUpdate(value, "data1")}
            />
          </Col>
        </Row>
        <Row>
          <Col span={9}>
            <small>Input 配置</small>
          </Col>
          <Col span={15}>
            <Input
              value={data2}
              onChange={value => handleValueUpdate(value, "data2")}
            />
          </Col>
        </Row>
        <Row>
          <Col span={9}>
            <small>InputNumber 配置</small>
          </Col>
          <Col span={15}>
            <InputNumber
              value={data3}
              style={{ width: "100%" }}
              size="small"
              onChange={value => handleValueUpdate(value, "data3")}
            />
          </Col>
        </Row>
        <Row>
          <Col span={9}>
            <small>Select 配置</small>
          </Col>
          <Col span={15}>
            <Select
              size="small"
              style={{ width: "100%" }}
              value={data4}
              onChange={value => handleValueUpdate(value, "data4")}
            >
              <Select.Option className={OptionsStyles.option} value="1">
                label 1
              </Select.Option>
            </Select>
          </Col>
        </Row>
        <Row>
          <Col span={9}>
            <small>ColorPicker 配置</small>
          </Col>
          <Col span={15}>
            <ColorPicker
              color={data5}
              placement="topLeft"
              className="colorPicker-class"
              onChange={handleColorOnChange}
            >
              <div className="picker-trigger" />
            </ColorPicker>
          </Col>
        </Row>
      </Collapse.Panel>
    </Collapse>
  );
};
