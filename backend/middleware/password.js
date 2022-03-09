
const passwordSchema = require('../models/password');

// vérifie que le mot de passe valide le schema décrit
module.exports = (req, res, next) => {
    if (!passwordSchema.validate(req.body.password)) {
        res.writeHead(400, '{"message":"Un minimum de 8 caractères contenant des majuscules, des minuscules, deux chiffres et un symbole sont requis pour créer un mot de passe ! "}', {
            'content-type': 'application/json'
        });
        res.end('Format de mot de passe incorrect');
    } else {
        next();
    }
};