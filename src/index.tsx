import { configure } from 'mobx';
import ReactDOM from 'react-dom/client';
import DemoIndex from './demos';
import './index.css';

configure({
  enforceActions: "never"
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <DemoIndex />
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
