import { Row, Col } from "antd";
import CoffeeApp from "./components/CoffeeApp";
import { Provider } from "react-redux";
import { store } from "./redux";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";

import { OpenAPI } from "./client";

OpenAPI.BASE = window.env.BACKEND_URL;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Row justify="center" align="middle">
          <Col
            className="App-header"
            xs={24}
            sm={24}
            md={24}
            lg={12}
            xl={12}
            xxl={12}
          >
            <div>
              <CoffeeApp />
            </div>
          </Col>
        </Row>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
