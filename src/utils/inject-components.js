import {
  Button,
  Table,
  Row,
  Col,
  Select,
  Form,
  FormItem,
  Option,
  Input,
  Image,
  Spin
} from 'view-ui-plus';
import { ScrollTop } from '@components';
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
  FormItem,
  Image,
  ScrollTop,
  Spin
};

const injectComponents = app => {
  for (const [componentName, componentInstance] of Object.entries(
    componentMap
  )) {
    app.component(componentName, componentInstance);
  }
};

export default injectComponents;
