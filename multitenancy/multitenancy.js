ZimoloMT={};
if(Meteor.isServer){
  
  /**
   {
     name
     owner
     members:[]

   }
  */
  var Tenant=new Mongo.Collection('tenant');
  



  ZimoloMT.Collection=function(name){
     var mongoc=new Mongo.Collection(name);
     Partitioner.partitionCollection(mongoc);
     return mongoc;
  };

  ZimoloMT.registerNewTenant=function(ownerUserId,tenantName){
     var count=Tenant.findOne({name:tenantName});
     if(count>0)
       throw new Meteor.Error('tenant '+tenantName+' already exists!');

     Tenant.insert({name:tenantName,owner:ownerUserId});

  };
  
  ZimoloMT.currentUserJoinTenant=function(tenantname){
     if(Meteor.userId()==undefined){
         throw new Meteor.Error('Can not join you to the tenant, you are not logged in yet!');
     }
     var tenant=Tenant.findOne({name:tenantname});
     if(tenant==undefined)
         throw new Meteor.Error('invalid tenant name '+tenantname);
     var userid=Meteor.userId();
     var pass=false;
     if(userid==tenant.owner)
        pass=true;
     else if(tenant.members!=undefined && tenant.members.indexOf(userid)>=0)
        pass=true;

     if(!pass)
        throw new Meteor.Error('can not join user who is not in the tenant group!');

     Partitioner.setUserGroup(userid, tenantname);
  };

}else if(Meteor.isClient){
   ZimoloMT.Collection=function(name){
     return new Mongo.Collection(name);
  };


}




