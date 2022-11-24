import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

NProgress.configure({
  speed: 1500,
  showSpinner: true,
  trickleSpeed: 150,
  minimum: 0.1
});

export default NProgress;
