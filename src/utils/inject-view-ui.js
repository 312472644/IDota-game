import { Button, Table } from 'view-ui-plus';
import 'view-ui-plus/dist/styles/viewuiplus.css'

const componentMap = {
  Button,
  Table
};

const injectComponents = (app) => {
  for (const [componentName, componentInstance] of Object.entries(componentMap)) {
    app.component(componentName, componentInstance);
  }
};

export default injectComponents;