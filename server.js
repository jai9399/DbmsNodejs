const express = require('express');
const app = express();
var onetime=0;
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1234',
  database : 'dbmsproject',
  multipleStatements:true
});
const bcrypt = require('bcrypt');
const Nexmo = require('nexmo');

const nexmo = new Nexmo({
  apiKey: '996f1613',
  apiSecret: 'qVd0n4RxzPPmmFfP',
});
var user;
connection.connect();
var check = true;
var newcash;

app.use(express.urlencoded());
app.use(express.static("C:/Users/Jai Kathuria/Desktop/dbms servers/htmlcss"));
app.set('view engine','hbs');
app.get('/',function(req,res){
        res.sendFile('C:/Users/Jai Kathuria/Desktop/dbms servers/htmlcss/crypto.html');
});
app.post('/run',function(req,res){
     let username = req.body.username;
     user=username;
     let password = req.body.password;
     let otp1 = req.body.otp;
     console.log(password);
     username = "\'"+username +"\'";
     let sql = "Select  password from Users Where username ="+username+";";
    connection.query(sql,function(error ,result , field){
            if(error){
                    res.redirect('/login.html');
                    res.end();
            }
            else{
                let sql="Select money from wallet where username ="+username+";"; 
                connection.query(sql,function(error ,result , field){
                     console.log(result);
                     if(error){
                             res.redirect('/eighthpage');
                     }
                     else{
                         newcash = parseInt(result[0].money);
                     } });
                 let pass =result[0].password;
                 if(pass==password && otp1 == onetime){
                   res.redirect('/home');
                   res.end();
                 } 
                 else{
                         res.redirect('/login.html');
                         res.end();
                 }  }
                 
            }
    );
});
app.get('/login',function(req,res){
        if(check){
    res.render('signup.hbs',{err:"Record Inserted"});
           }
      else{
         res.render('signup.hbs',{err:"Record Duplicated"});     
      }  
        
});
var count=0;
connection. query("Select count(*) as number from users;",function (error, results, fields) {
                if(error){
                        console.log('Error');
                        } 
                                           
                 else{
                      count=results[0].number;                 
                } 
                   });
app.post('/make',function(req,res){
     console.log("");
    count++;
     var email = req.body.email;
     user = req.body.username;
     var password = req.body.password;
     let pan = req.body.pancard;
     pan= "\'"+pan+"\'";
	 let phone = req.body.phone;
     username = "\'"+user+"\'";
     email="\'"+email+"\'";
     password="\'"+password+"\'";
     console.log(password)
     bcrypt.hash(password,1,function(err,hash){
     hash = "\'"+hash+"\'";            
     let sql = "Insert into Users values("+count+","+username+","+email+","+password+","+pan+","+phone+","+hash+");"
     connection. query(sql,function (error, results, fields) {
     if (error) {
                     console.log('Duplicate Entry');
                     count--;
                     check=false;
                     console.log(error);
                     } 
                                        
              else{
                   console.log('Inserted Record');
                   check=true;} 
                });
                sql="Insert into wallet values("+username+","+0+");"
                connection. query(sql,function (error, results, fields) {
                        if (error) {
                                if(error){
                                        console.log('Error');
                                        } 
                                                           }
                                 else{
                                      console.log('Inserted Record');
                                      check=true;} 
                                   }
                                   
                
                );
 res.redirect('/login');
 res.end();
});});
var newcash=0;
app.post('/funds',function(req,res)
{    
   let username = "\'"+user+"\'";
   let check = false;
    console.log(req.body);
    console.log(username);
    let cash = parseInt(req.body.money);
     
    let sql="Select money from wallet where username ="+username+";"; 
   connection.query(sql,function(error ,result , field){
        console.log(result);
        if(error){
                res.redirect('/eighthpage');
        }
        else{
            newcash = parseInt(result[0].money);
             newcash = newcash+cash;
             res.redirect('/update');
        } });
         
        
});
app.get('/update',function(req,res){
        let sql2="Update wallet set money ="+newcash+' where username ='+"\'"+user+"\'"+";"; 
        connection.query(sql2,function(error ,result , field){
            if(error){
                    console.log(error);
                    res.redirect('/eighthpage');
            }
            else{
                 console.log(sql2);
                 console.log(newcash);
                 console.log('Updated');
                 res.redirect('/eighthpage');
            } });
});

//users table Id , Username , Email , Password

app.get('/home',function(req,res){
        res.render('crypto.hbs',{"name":user});
});
app.get('/secondpage',function(req,res){
        res.render('about.hbs',{"name":user});
});
app.get('/thirdpage',function(req,res){
       res.render('pricing.hbs',{"name":user});
});
app.get('/fifthpage',function(req,res){
       res.render('earn.hbs',{"name":user});
});
app.get('/sixthpage',function(req,res){
     res.render('buysell.hbs',{"name":user});
});
app.get('/seventhpage',function(req,res){
    res.render('sell.hbs',{"name":user});
});
app.get('/eighthpage',function(req,res){
      res.render('wallet.hbs',{"name":user,"money":newcash});
});
app.listen(8010,function(){
        console.log("Server Started");
});
var newwallet;
app.post("/buy1",function(req,res){ 
      let value,wallet;   
      value = req.body.value;
      let username = "\'"+user+"\'";
      value = value*25;
      var type='Ripple';
      type = "\'"+type+"\'";
      let sql2 = "insert into bought values("+username+","+value+","+type+");";
      connection.query(sql2,function(error ,result , field){
        if(error){
                console.log(error);
                res.redirect('/sixthpage');
        }
        else{
             console.log('Bought');
             connection.query("Select money from wallet where username ="+"\'"+user+"\'"+";",function(error ,result , field){
                if(error){
                        console.log(error);
                        
                }
                else{
                     console.log('Got');
                     wallet = result[0].money;
                     newwallet = wallet-value;
                     res.redirect('/remove');
                } });  
        } });
       
});
app.get('/remove',function(req,res){
        connection.query("Update wallet set money = "+newwallet+" where username ="+"\'"+user+"\'"+";",function(error ,result , field){
                if(error){
                        console.log(error);
                }
                else{
                     newcash=newwallet;
                     console.log('deduct');
                     res.redirect('/eighthpage');
                } });
});
app.post("/buy2",function(req,res){
        let value,wallet;   
        value = req.body.value;
        let username = "\'"+user+"\'";
        value = value*6650;
        var type='Dash';
        type = "\'"+type+"\'";
        let sql2 = "insert into bought values("+username+","+value+","+type+");";
        connection.query(sql2,function(error ,result , field){
          if(error){
                  console.log(error);
                  res.redirect('/sixthpage');
          }
          else{
               console.log('Bought');
               connection.query("Select money from wallet where username ="+"\'"+user+"\'"+";",function(error ,result , field){
                  if(error){
                          console.log(error);
                          
                  }
                  else{
                       console.log('Got');
                       wallet = result[0].money;
                       newwallet = wallet-value;
                       res.redirect('/remove');
                  } });  
          } });
         
});
app.post("/buy3",function(req,res){
        let value,wallet;   
        value = req.body.value;
        let username = "\'"+user+"\'";
        value = value*591722.87;
        var type='Bitcoin';
        type = "\'"+type+"\'";
        let sql2 = "insert into bought values("+username+","+value+","+type+");";
        connection.query(sql2,function(error ,result , field){
          if(error){
                  console.log(error);
                  res.redirect('/sixthpage');
          }
          else{
               console.log('Bought');
               connection.query("Select money from wallet where username ="+"\'"+user+"\'"+";",function(error ,result , field){
                  if(error){
                          console.log(error);
                          
                  }
                  else{
                       console.log('Got');
                       wallet = result[0].money;
                       newwallet = wallet-value;
                       res.redirect('/remove');
                  } });  
          } });
         

});
app.post("/buy4",function(req,res){
        let value,wallet;   
        value = req.body.value;
        let username = "\'"+user+"\'";
        value = value*12985.81;
        var type='Ethereum';
        type = "\'"+type+"\'";
        let sql2 = "insert into bought values("+username+","+value+","+type+");";
        connection.query(sql2,function(error ,result , field){
          if(error){
                  console.log(error);
                  res.redirect('/sixthpage');
          }
          else{
               console.log('Bought');
               connection.query("Select money from wallet where username ="+"\'"+user+"\'"+";",function(error ,result , field){
                  if(error){
                          console.log(error);
                          
                  }
                  else{
                       console.log('Got');
                       wallet = result[0].money;
                       newwallet = wallet-value;
                       res.redirect('/remove');
                  } });  
          } });
         

});
app.post("/sell4",function(req,res){
        let value,wallet;   
        value = req.body.value;
        let username = "\'"+user+"\'";
        value = value*12985.81;
        var type='Ethereum';
        type = "\'"+type+"\'";
        let sql2 = "insert into sold values("+username+","+value+","+type+");";
        connection.query(sql2,function(error ,result , field){
          if(error){
                  console.log(error);
                  res.redirect('/sixthpage');
          }
          else{
               console.log('Sold');
               connection.query("Select money from wallet where username ="+"\'"+user+"\'"+";",function(error ,result , field){
                  if(error){
                          console.log(error);
                          
                  }
                  else{
                       console.log('Got');
                       wallet = result[0].money;
                       newwallet = wallet+value;
                       res.redirect('/remove');
                  } });  
          } });

});
app.post("/sell3",function(req,res){
        let value,wallet;   
        value = req.body.value;
        let username = "\'"+user+"\'";
        value = value*591722.87;
        var type='Bitcoin';
        type = "\'"+type+"\'";
        let sql2 = "insert into sold values("+username+","+value+","+type+");";
        connection.query(sql2,function(error ,result , field){
          if(error){
                  console.log(error);
                  res.redirect('/sixthpage');
          }
          else{
               console.log('Sold');
               connection.query("Select money from wallet where username ="+"\'"+user+"\'"+";",function(error ,result , field){
                  if(error){
                          console.log(error);
                          
                  }
                  else{
                       console.log('Got');
                       wallet = result[0].money;
                       newwallet = wallet+value;
                       res.redirect('/remove');
                  } });  
          } });

});
app.post("/sell2",function(req,res){
        let value,wallet;   
        value = req.body.value;
        let username = "\'"+user+"\'";
        value = value*6650;
        var type='Dash';
        type = "\'"+type+"\'";
        let sql2 = "insert into sold values("+username+","+value+","+type+");";
        connection.query(sql2,function(error ,result , field){
          if(error){
                  console.log(error);
                  res.redirect('/sixthpage');
          }
          else{
               console.log('Sold');
               connection.query("Select money from wallet where username ="+"\'"+user+"\'"+";",function(error ,result , field){
                  if(error){
                          console.log(error);
                          
                  }
                  else{
                       console.log('Got');
                       wallet = result[0].money;
                       newwallet = wallet+value;
                       res.redirect('/remove');
                  } });  
          } });

});
app.post("/sell1",function(req,res){
        let value,wallet;   
        value = req.body.value;
        let username = "\'"+user+"\'";
        value = value*25.81;
        var type='Ripple';
        type = "\'"+type+"\'";
        let sql2 = "insert into sold values("+username+","+value+","+type+");";
        connection.query(sql2,function(error ,result , field){
          if(error){
                  console.log(error);
                  res.redirect('/seventhpage');
          }
          else{
               console.log('Sold');
               connection.query("Select money from wallet where username ="+"\'"+user+"\'"+";",function(error ,result , field){
                  if(error){
                          console.log(error);
                          
                  }
                  else{
                       console.log('Got');
                       wallet = result[0].money;
                       newwallet = wallet+value;
                       res.redirect('/remove');
                  } });  
          } });

});
app.post('/otp',function(req,res){
   let phn = req.body.phnnum;
   console.log(phn);
   let otp1 = generateOTP();
   onetime=otp1;
   const from = 8489170582;
   const to = phn;
   const text=otp1;
   nexmo.message.sendSms(from , to , text,function(err,res){
           console.log('sent');
   })
   console.log(otp1);
   res.redirect('/login.html')
});
function generateOTP() {  
        var digits = '0123456789'; 
        let OTP = ''; 
        for (let i = 0; i < 4; i++ ) { 
            OTP += digits[Math.floor(Math.random() * 10)]; 
        } 
        return OTP; 
    } 