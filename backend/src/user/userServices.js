var userModel = require('./userModel');
var key = '123456789trytryrtyr';
var encryptor = require('simple-encryptor')(key);
module.exports.createUserDbService = (userDetails) => {
   return new Promise(function myFn(resolve, reject) {
       var userModelData = new userModel();
       userModelData.firstname = userDetails.firstname;
       userModelData.lastname = userDetails.lastname;
       userModelData.email = userDetails.email;
       userModelData.password = userDetails.password;
       var encrypted = encryptor.encrypt(userDetails.password);
       userModelData.password = encrypted;
       userModelData.save(function resultHandle(error, result) {
           if (error) {
               reject(false);
           } else {
               resolve(true);
           }
       });
   });
}
module.exports.loginuserDBService = (userDetails)=> 
{
   return new Promise(function myFn(resolve, reject) 
   {
      userModel.findOne({ email: userDetails.email},function getresult(errorvalue, result)
      {
         if(errorvalue)
         {
            reject({status: false, msg: "Invaild Data"});
         }
         else
         {
            if(result !=undefined &&  result !=null)
            {
               var decrypted = encryptor.decrypt(result.password);
               if(decrypted== userDetails.password)
               {
                  resolve({status: true,msg: "User Validated Successfully"});
               }
               else
               {
                  reject({status: false,msg: "User Validated failed"});
               }
            }
            else
            {
               reject({status: false,msg: "User Error Detailssss"});
            }
         }
      
      });
      
   });
}