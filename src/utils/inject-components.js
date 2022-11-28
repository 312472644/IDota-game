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
  Spin,
  Tabs,
  TabPane,
  Exception,
  Divider,
  Modal
} from 'view-ui-plus';
import { ScrollTop, Anchor, AnchorLink, wxBarCode } from '@components';
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
  Spin,
  Tabs,
  TabPane,
  Exception,
  Divider,
  Modal,
  Anchor,
  ScrollTop,
  AnchorLink,
  wxBarCode
};

const injectComponents = app => {
  for (const [componentName, componentInstance] of Object.entries(componentMap)) {
    app.component(componentName, componentInstance);
  }
};

export default injectComponents;
