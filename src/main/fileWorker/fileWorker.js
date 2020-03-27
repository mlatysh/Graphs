import * as fs from 'fs'

export class FileWorker {
    static saveJsonToFile(jsonObj, filePath) {
        fs.writeFileSync(filePath, JSON.stringify(jsonObj), 'utf-8')
    }

    static getJsonFromFile(filePath) {
        return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    }
}
