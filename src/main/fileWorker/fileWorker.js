import * as fs from 'fs'

export class FileWorker {
    static saveJsonToFile(jsonObj, filePath) {
        fs.writeFile(filePath, JSON.stringify(jsonObj, undefined, 2), 'utf-8', err => {
            return !err;
        })
    }

    static getJsonFromFile(filePath) {
        return fs.readFileSync(filePath, 'utf-8')
    }
}
