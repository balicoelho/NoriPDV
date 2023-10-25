const aws = require('aws-sdk');
const {obterBufferDeUrl,
    obterContentTypeDeUrl} = require('../utils/imagens')

const endpoint = new aws.Endpoint(process.env.BUCKET_ENDPOINT);

const s3 = new aws.S3({
    endpoint,
    credentials:{
        accessKeyId:process.env.BUCKET_KEY_ID,
        secretAccessKey: process.env.BUCKET_APP_KEY
    }
})

const uploadArquivo = async (path, url)=>{
    
    const contentType = await obterContentTypeDeUrl(url);

    if (!contentType.startsWith('image/')){
        throw new Error("A url informada não possui uma imagem válida!");
    }

    const parametros = {
        Bucket: process.env.BUCKET_NAME,
        Key: path,
        Body: await obterBufferDeUrl(url),
        ContentType: contentType
    }
    const arquivoSalvo = await s3.upload(parametros).promise();
    return arquivoSalvo;
}

const excluirArquivo = async (url)=>{
    console.log("excluirArquivo");
    
    const urlAnalisada = new URL(url);
    const path = decodeURIComponent(urlAnalisada.pathname.slice(1));

    await s3.deleteObject({
        Bucket: process.env.BUCKET_NAME,
        Key: path
    }).promise();
}

module.exports = {
    uploadArquivo,
    excluirArquivo
}