export default async function logout(req, res){
    res.cookie("JWT_TOKEN", "", {
        httpOnly: true, 
        secure: true,
        sameSite: "none",    
        expires: new Date(1)
    });

    res.redirect('/')
}