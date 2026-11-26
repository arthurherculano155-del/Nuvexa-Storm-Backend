import usuarios from './controller/usuarios/usuarioController.js';
import paineis from './controller/paineis/paineisController.js';

export function addRoutes(api){
    api.use(usuarios);
    api.use(paineis);
}