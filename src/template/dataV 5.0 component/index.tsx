import React, { useState, useEffect } from "react";
import { IProps } from "@/dataV/common";
import Styles from "./index.less";

export default (props: IProps) => {
  const {
    options: { options = {}, width, height }
  } = props;
  // const {} = options
  // const [data, setData] = useState(props.options[props.options.dataSource]);

  useEffect(() => {
    getList();
  }, []);

  const getList = () => {};

  return (
    <div className={Styles.index} style={{ width, height }}>
      <div style={{ color: '#fff' }}>123</div>
      <div style={{ color: '#fff' }}>1234</div>
    </div>
  );
};
