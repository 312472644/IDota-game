import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

NProgress.configure({
  speed: 1000,
  showSpinner: false,
  trickleSpeed: 150,
  minimum: 0.1
});

export default NProgress;
