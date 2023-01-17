import { app } from "electron";
import path from "path";

declare global {
    var isValidationAvailable: boolean;
    var isDefaultAvailable: boolean;
  }

export const APP_DATA_PATH = path.join(app.getPath("appData"), "Mining-tool"); 

export const APP_MODEL_PATH = path.join(APP_DATA_PATH, "models");
export const APP_LOG_PATH = path.join(APP_DATA_PATH, "logs");
export const APP_ALGORITHM_PATH = path.join(APP_DATA_PATH, 'algorithms')
export const APP_PUBLIC_DEFAULT_ALGORITHM = path.join(__dirname, '../../../../DisCoveR-TS-main/build/main.js')
export const APP_PUBLIC_DEFAULT_ALGORITHM_NAME = "DisCoveR-TS-main";
export const APP_TEST = path.join(APP_DATA_PATH, "test log")
export const APP_TEST_LOG = path.join(APP_TEST, "log_1.xes")
export const PUBLIC_TEST_LOG = path.join(path.dirname(__dirname) , '../../../web/public/log_1.xes')

export const PRELOAD_FILE_PATH = path.join(__dirname, "preload.js");

export const ACCEPTED_FILES_FORMATES = [".xes", ".csv"];
export const ACCEPTED_ALGORITHM_FILES = [".js"];

// MODELS:
export const SPACE_BETWEEN_MINED_EVENTS_X_START = 50;
export const SPACE_BETWEEN_MINED_EVENTS_Y_START = 0;
export const MINED_EVENT_HEIGHT = 150;
export const MINED_EVENT_WIDTH = 75;
export const SPACE_BETWEEN_MINED_EVENTS_X = MINED_EVENT_WIDTH +5 ;
export const SPACE_BETWEEN_MINED_EVENTS_Y = 0;
export const VALIDATION_AVAILABLE = false;