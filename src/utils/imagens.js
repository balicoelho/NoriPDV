const axios = require('axios');
const pathURL = require('path');

const obterBufferDeUrl = async (url) => {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    return Buffer.from(response.data, 'binary');
}

const obterContentTypeDeUrl = async (url) =>{
    const response = await axios.head(url);
    const contentType = response.headers['content-type'];
    return contentType;
}

module.exports = {
  obterBufferDeUrl,
  obterContentTypeDeUrl
}