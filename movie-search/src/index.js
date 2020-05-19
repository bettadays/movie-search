import 'babel-polyfill';
import mySwiper from './js/mySwiper';
import App from './js/App';
import assignHandlers from './js/handlers';
import * as constants from './js/constants/constants';


mySwiper.init();

const app = new App();
assignHandlers(app);
app.getMovies(constants.INIT_MOVIE_REQUEST);
