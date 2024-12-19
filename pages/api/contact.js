import {MongoClient} from 'mongodb';





export default async function handler(req, res){
       if(req.method === 'POST'){ 
        const {email, name, message} = req.body;

        if(!email || !email.includes('@') || !name || name.trim() === '' || !message || message.trim() === ''){
            res.status(422).json({ message: 'Invalid input.'})
            return;  
        }

        //Store it in  a database
        const newMessage = {
            email,
            name,
            message
        };

        let client;

        //const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.xpqfv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

        try {
            
         client =  await MongoClient.connect('mongodb+srv://kakieosita:A4XPfUv5sqIISODx@cluster0.xpqfv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        } catch (error) {
            res.status(500).json({message: 'Could not connect to Database'})
            return;
        }
        const db = client.db('my-site');

        try {
        const result = await db.collection('messages').insertOne(newMessage);
        newMessage.id = result.insertedId;
        } catch (error) {
          client.close();
          res.status(500).json({message: 'Storing message failed!'})
          return;  
        }


        client.close()
        res.status(201).json({message: 'Successfully stored message!',  message: newMessage})
       } 

    }