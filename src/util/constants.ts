import {Platform
} from 'react-native';

const BASE_URL = "https://wander-api.herokuapp.com/api"; 
const URL_TO_UPLOAD_FILES = "https://wander-api.herokuapp.com/api/" + 'upload/';
const PLATFORM = Platform.OS == 'ios' ? 'ios' : 'android';
const CURRENT_VERSION = '1.0';
const API_VERSION = '1.0';


module.exports = {
    BASE_URL,
    URL_TO_UPLOAD_FILES,
    PLATFORM,
    CURRENT_VERSION,
    API_VERSION,
}