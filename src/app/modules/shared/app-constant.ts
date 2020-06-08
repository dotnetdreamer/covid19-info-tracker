
import { environment } from '../../../environments/environment';

export class AppConstant {
    public static readonly DEBUG = !environment.production;

    public static readonly BASE_URL = !environment.production 
        ? "https://covidapi.info/" : "https://covidapi.info/";
    public static readonly BASE_API_URL = `${AppConstant.BASE_URL}api/v1/`;
    public static readonly DB_NAME = "covid-info-tracker";

    public static readonly DEFAULT_DATETIME_FORMAT = "YYYY-MM-DD HH:mm:ss";
    public static readonly DEFAULT_DATE_FORMAT = "YYYY-MM-DD";
    public static readonly DEFAULT_TIME_FORMAT = "HH:mm";
    
    public static readonly EVENT_DB_INITIALIZED = "event:dbInitialized"; 
    public static readonly EVENT_LANGUAGE_CHANGED = "event:languageChanged";

    public static readonly KEY_WORKING_LANGUAGE = "key:workingLanguage";

}