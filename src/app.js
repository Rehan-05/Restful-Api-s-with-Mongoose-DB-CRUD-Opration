
const express = require("express");
require("./db/conn");
const userStudentData = require("./model/student");


const app = express();
const port = process.env.PORT || 3000;


// app.get(route,callback)
// route: the path to the resource
// callback: When someone makes a request to the route, 
//this function will be called with the request and response objects as arguments.

app.use(express.json());

    // app.post("/students", (req, res) => {
        
    //     console.log(req.body);
        
    //     const userResult = new userStudentData(req.body);
    //     userResult.save().then(() => {
    //         res.status(201).send(userResult);
    //     }).catch((err) => {
    //         res.status(400).send(err);
    //     });
    // });


    app.post("/students", async(req, res) => {     
        try{
             const userResult = new userStudentData(req.body); 
             const UserCreate=  await userResult.save();
             res.status(201).send(UserCreate);
            
           }catch(err){
                res.status(400).send(err);
            }
    });

// get students data as a whole 

    app.get("/students",async(req, res) => {
        try{
            const userResult = await userStudentData.find();
            res.send(userResult);
            }catch(err){
               res.status(400).send(err);
        }
        });

// get individual students data by id
 
     app.get("/students/:id",async(req, res) => {
        try{cls
                console.log(req);
                //anything we are writing on the uri this params will help us to get the id
                const userResult = await userStudentData.findById(req.params.id);
                res.send(userResult);
                }catch(err){
                res.status(400).send(err);   
                }
        });

  // Delete students data by id
  
      app.delete("/students/:id", async(req,res) =>{
       
        try{
            const userResult = await userStudentData.findByIdAndDelete(req.params.id);
                if(!userResult){
                    res.status(404).send("Not found");
                }
                    res.send(userResult);
            }
        catch(err){
            res.status(400).send(err);
        }
      });


      // Update students data by id

        app.patch("/students/:id", async(req,res) =>{
            try{
                const userResult = await userStudentData.findByIdAndUpdate(req.params.id, req.body, {new: true});
                if(!userResult){
                    res.status(404).send("Not found");
                }
                    res.send(userResult);
                }
            catch(err){
                res.status(400).send(err);
            }
        }
        );

       // update students data by email
       
       app.patch("/students/:email", async(req,res) =>{
        try{
            const userResult = await userStudentData.findOneAndUpdate(req.params.email, req.body, {new: true,});
            if(!userResult){
                res.status(404).send("Not found");
            }
                res.send(userResult);
            }
        catch(err){
            res.status(400).send(err);
        }
    });



// We need to listen a requests that are coming on the specific port 3000

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})
