import React, { useRef, useEffect, useState, FC } from "react";
import { GridContent } from "@ant-design/pro-layout";
import { Menu } from "antd";
import UserInfor from './components/UserInfor';
import SecurityView from './components/SecurityView';

import styles from "./styles.less";

const { Item } = Menu;

type AccountSettingsStateKeys = 'base' | 'security';

const menuMap = {
  base: 'Thông tin cơ bản',
  security: 'Bảo mật',
};

function getMenu() {
  return Object.keys(menuMap).map((key) => <Item key={key}> {menuMap[key]}</Item>);
}

const Settings: FC = () => {
  const mainRef = useRef<any>(null);
  const [selectKey, setSelectKey] = useState("base");
  const [mode, setMode] = useState("inline");

  useEffect(() => {
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  function resize() {
    if (!mainRef) return;
    window.requestAnimationFrame(() => {
      if (!mainRef) {
        return;
      }
      let modeResize: "inline" | "horizontal" = "inline";
      // TODO tìm hiểu về offsetWidth và innerWidth
      const { offsetWidth } = mainRef.current;
      if (offsetWidth < 641 && offsetWidth > 400) {
        modeResize = "horizontal";
      }
      if (window.innerWidth < 768 && offsetWidth > 400) {
        modeResize = "horizontal";
      }
      setMode(modeResize);
    });
  }

  function renderChildren() {
    switch (selectKey) {
      case "base":
        return <UserInfor/>;
      case "security":
        return <SecurityView/>;
      default:
        break;
    }
    return null;
  }

  return (
    <GridContent>
      <div className={styles.main} ref={mainRef}>
        <div className={styles.leftMenu}>
          <Menu
            // @ts-ignore
            mode={mode}
            selectedKeys={[selectKey]}
            onClick={({ key }) => setSelectKey(key as AccountSettingsStateKeys)}
          >
            {getMenu()}
          </Menu>
        </div>
        <div className={styles.right}>
          <div className={styles.title}>{menuMap[selectKey]}</div>
          {renderChildren()}
        </div>
      </div>
    </GridContent>
  );
};

export default Settings;
