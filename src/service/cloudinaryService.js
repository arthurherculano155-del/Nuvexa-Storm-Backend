import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function enviarFotoPerfil(caminhoArquivo) {
    try {
        const resultado = await cloudinary.uploader.upload(caminhoArquivo, {
            folder: "cursinho-pertinho/perfis"
        });

        return resultado.secure_url;
    } finally {
        if (fs.existsSync(caminhoArquivo)) {
            fs.unlinkSync(caminhoArquivo);
        }
    }
}

export default cloudinary;