

export const redSocial=(req, res)=>{

    res.render('red',{
        user: req.session.name,
        mode: req.session.config.modo    
    })
}