const mongoose = require('mongoose')

mongoose
    .connect(process.env.MONGODB_URI, {
        dbName: process.env.DB_NAME,
    })
    .then(()=>{
        console.log('mongodb connected')
    })
    .catch((err)=> console.log(err.message))

    mongoose.connection.on('connected', ()=>{
        console.log('Mongoose connected to database')
    })

    mongoose.connection.on('error', (err)=>{
        console.log(err.message)
    })

    mongoose.connection.on('disconnected', () => {
        console.log('Mongoose connection is disconnected');
    });
    
    process.on('SIGINT', async () => {
        await mongoose.connection.close({ force: true });
        process.exit(0);
    });
    