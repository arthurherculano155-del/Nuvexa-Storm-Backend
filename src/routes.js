import usuarios from './controller/usuarios/usuarioController.js';

export function addRoutes(api){
    api.use(usuarios);
}