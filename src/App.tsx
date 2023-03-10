import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Row, Col } from 'antd';
import CoffeeApp from './components/CoffeeApp';

function App() {
  return (
    <Row justify="center" align="middle">
    <Col className='App-header' xs={24} sm={24} md={24} lg={12} xl={12} xxl={12} >
      <div >
      <CoffeeApp />
      </div>
    </Col>
  </Row>

  );
}

export default App;
