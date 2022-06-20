import fs from "fs";

import { APP_DATA_PATH, APP_MODEL_PATH, APP_ALGORITHM_PATH, APP_TEST, APP_TEST_LOG, PUBLIC_TEST_LOG, APP_PUBLIC_DEFAULT_ALGORITHM } from "./constants";

export default function init() {
    if (!fs.existsSync(APP_DATA_PATH)) {
        fs.mkdirSync(APP_DATA_PATH, { recursive: true});
    }
    if (!fs.existsSync(APP_MODEL_PATH)) {
        fs.mkdirSync(APP_MODEL_PATH, { recursive: true});
    }
    if (!fs.existsSync(APP_ALGORITHM_PATH)) {
        fs.mkdirSync(APP_ALGORITHM_PATH, {recursive:true});
    }
    if(!fs.existsSync(APP_TEST)) {
        fs.mkdirSync(APP_TEST, {recursive:true})
    }
    if(!fs.existsSync(APP_TEST_LOG)) {
        let content = fs.readFileSync(PUBLIC_TEST_LOG)
        fs.writeFileSync(APP_TEST_LOG, content);
        if(fs.existsSync(APP_TEST_LOG)) {
            global.isValidationAvailable = true;
        }
    }else{
        global.isValidationAvailable = true;
    }

    if(fs.existsSync(APP_PUBLIC_DEFAULT_ALGORITHM)){
        global.isDefaultAvailable = true;
    }
}