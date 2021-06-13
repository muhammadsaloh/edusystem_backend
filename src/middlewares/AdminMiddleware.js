
export default async (req, res, next) => {
    try {
        
        const user = await req.postgres.users.findOne({
            where: {
                user_id: req.user
            }
        })
        
        if(user.dataValues.role != "admin" && user.dataValues.role != "superadmin"){
            throw new Error("You don't have permission")
        }

        req.isSuperAdmin = user.dataValues.role == "superadmin"
        
        next()
        
    } catch (error) {
        res.status(403).json({
            ok: false,
            message: error + ""
        })  
    }
}