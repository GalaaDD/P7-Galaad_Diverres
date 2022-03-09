const passwordValidator = require('password-validator');

// Create a schema
const passwordSchema = new passwordValidator();

// Add properties to it
passwordSchema
    .is().min(8) 
    .has().uppercase()
    .has().lowercase() 
    .has().digits()
    .has().not().spaces() 
    .is().not().oneOf(['Passw0rd', 'Password123']);

module.exports = passwordSchema;