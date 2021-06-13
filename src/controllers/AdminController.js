import fs from 'fs/promises'
import path from 'path'
import settingsValidation from '../validations/settingsValidation.js';
let __dirname = path.resolve(path.dirname(''));


class SettingsController {
    static async editSettings (req, res) {
        try {
            if(!req.isSuperAdmin) throw Error("Only super admin change site settings")
            const data = await settingsValidation.validateAsync(req.body)
            const settings = {
                ...req.settings,
                ...data
            }

            fs.writeFile(path.join(__dirname, "settings.json"), JSON.stringify(settings))

            req.settings = settings

           res.send({
               ok: true,
               message: "Updated"
           }) 
        } catch (error) {
            res.status(400).json({
                ok: false,
                message: error + ""
            })
        }
    }
}

export default SettingsController