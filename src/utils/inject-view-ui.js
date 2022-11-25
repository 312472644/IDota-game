import {
  Button,
  Table,
  Row,
  Col,
  Select,
  Form,
  FormItem,
  Option,
  Input
} from 'view-ui-plus';
import 'view-ui-plus/dist/styles/viewuiplus.css';

const componentMap = {
  Input,
  Button,
  Table,
  Row,
  Col,
  Select,
  Option,
  Form,
  FormItem
};

const injectComponents = app => {
  for (const [componentName, componentInstance] of Object.entries(
    componentMap
  )) {
    app.component(componentName, componentInstance);
  }
};

export default injectComponents;
