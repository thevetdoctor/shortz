// const randomId = require('../helpers/index');
const { nanoid } = require('nanoid');
const validUrl = require('valid-url');
const Url = require('../models/index');

const urlController = {

    createShortenedUrl: async(req, res) => {
        const {url} = req.body;
        if(!url) return res.status(404).json('Url not supplied');

        if(!validUrl.isUri(url)) return res.status(404).json('Url does not appear valid');

        try {
            const urlExist = await Url.findOne({ url });

            if(urlExist) {
                console.log('urlExist', urlExist);
                return res.status(200).json(urlExist);
            }
            const short = nanoid(5);
            
            const newUrl = new Url({
                url,
                short
            });
            
            newUrl.save();
            console.log('newUrl', newUrl);

            return res.status(201).json(newUrl);
            
        } catch (error) {
            console.log(error.message);
            return res.status(500).json('Server error');
        }
    },

    getOriginalUrl: async(req, res) => {
        const { short } = req.params;
        
        if(!short) return res.status(404).json('Short url not supplied: as query parameter');

        try {
            const url = await Url.findOne({ short });
            if(url) {
                console.log('url', url);
                res.status(200).redirect(url.url);
            } else {
                return res.status(404).json('Url not available in record');  
            }
        } catch (error) {
            console.log(error.message);
            return res.status(500).json('Server error');   
        }
    }
};

module.exports = urlController;