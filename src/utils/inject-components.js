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
  Modal,
  Icon,
  Tag,
  Card,
  PageHeader,
  Circle,
  Page
} from 'view-ui-plus';
import { ScrollTop, Anchor, AnchorLink, WeChatBarCode, Empty, PageLoading } from '@/components';
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
  Card,
  Tag,
  PageHeader,
  Icon,
  Circle,
  Page,
  Anchor,
  ScrollTop,
  AnchorLink,
  WeChatBarCode,
  Empty,
  PageLoading
};

const injectComponents = app => {
  for (const [componentName, componentInstance] of Object.entries(componentMap)) {
    app.component(componentName, componentInstance);
  }
};

export default injectComponents;
