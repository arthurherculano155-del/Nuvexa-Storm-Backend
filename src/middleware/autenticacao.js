import jwt from 'jsonwebtoken';

export function autenticar(req, resp, next){
    const authorization = req.headers.authorization;

    if(!authorization){
        resp.status(401).send({
            erro: "Token não informado"
        })

        return;
    }

    const token = authorization.split(" ")[1];

    try{
        const usuario = jwt.verify(
            token,
            process.env.JWT_SECRET
        )

        req.usuario = usuario;

        next();
    }
    catch(err){
        resp.status(401).send({
            erro: "Token expirado ou inválido."
        })
    }
}

export function appenasAdmins(req, resp, next){
    if(req.usuario.cargo !== "Admin"){
        return resp.status(401).send({
            erro: "Acesso permitido apenas para administradores!"
        })
    }

    next()
}