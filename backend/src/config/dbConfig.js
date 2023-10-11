const mongoose = require('mongoose');


const connection = mongoose.connect('mongodb+srv://admin:admin@cluster0.vmalabn.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>console.log('Conectado')).catch(error=>console.error(error));


module.exports = connection;
