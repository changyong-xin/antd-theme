import { ConfigProvider } from 'antd';
import { configure } from 'mobx';
import ReactDOM from 'react-dom/client';
import DemoIndex from './demos';
import './index.css';
import './lib/index.scss';

configure({
  enforceActions: "never"
})

ConfigProvider.config({
  prefixCls: 'ant',
  iconPrefixCls: 'anticon',
  // 5.6.0+
  // 请优先考虑使用 hooks 版本
  theme: { token: { colorPrimary: 'red', colorInfo: 'red' } },
});



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<DemoIndex />);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
