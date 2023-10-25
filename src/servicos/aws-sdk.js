const aws = require('aws-sdk');

const endpoint = new aws.Endpoint(process.env.BUCKET_ENDPOINT);

const s3 = new aws.S3({
    endpoint,
    credentials:{
        accessKeyId:process.env.BUCKET_KEY_ID,
        secretAccessKey: process.env.BUCKET_APP_KEY
    }
})

const uploadArquivo = async (path, buffer, contentType)=>{
    
    if (!contentType.startsWith('image/')){
        throw new Error("O arquivo não é uma imagem válida!");
    }

    const parametros = {
        Bucket: process.env.BUCKET_NAME,
        Key: path,
        Body: buffer,
        ContentType: contentType
    }
    
    const arquivoSalvo = await s3.upload(parametros).promise();

    const url = `http://${process.env.BUCKET_NAME}.${process.env.BUCKET_ENDPOINT}${arquivoSalvo.Location}`;
    
    return url;
}

const excluirArquivo = async (url)=>{
    
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