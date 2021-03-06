import Vue from 'vue';
import { 
    Button,
    Form,
    FormItem,
    Input,
    Message,
    MessageBox,
    Container,
    Aside,
    Header,
    Main,
    Menu,
    MenuItem,
    Submenu,
    Breadcrumb,
    BreadcrumbItem,
    Tooltip,
    Card,
    Col,
    Row,
    Table,
    TableColumn,
    Dialog,
    Pagination,
    Switch,
    Select,
    Option,
    Upload,
    Radio,
    Tag,
    TabPane,
    Tabs
 } from 'element-ui';



Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Header);
Vue.use(Container);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Tooltip)
Vue.use(Button);
Vue.use(Card)
Vue.use(Col)
Vue.use(Row)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Dialog)
Vue.use(Pagination)
Vue.use(Switch)
Vue.use(Select)
Vue.use(Option)
Vue.use(Upload)
Vue.use(Radio)
Vue.use(Tag)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.prototype.$message = Message;
Vue.prototype.$confirm=MessageBox.confirm;