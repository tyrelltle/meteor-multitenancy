if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });



	Meteor.loginWithPassword('a@a.a','a',function(){
		 console.log('current user id: '+Meteor.userId());
		 Meteor.call('asd');
	       

        });
}

//Col=ZimoloMT.Collection('col');
Col=new Mongo.Collection('col');
if (Meteor.isServer) {
  Meteor.startup(function () {
	Meteor.users.remove({});    
	Accounts.createUser({username:'asd',email:'a@a.a',password:'a'}); 
	var user=Meteor.users.findOne();     
        ZimoloMT.registerNewTenant(user._id,'tenant1');
	ZimoloMT.registerNewTenant(user._id,'tenant2');
	
  });



  Meteor.methods({
    'asd':function(){
                 ZimoloMT.currentUserJoinTenant('tenant1');
                 Col.insert({name:'1'});
                 Col.insert({name:'2'});
                 var res=Col.find();
                 console.log(res);

                         ZimoloMT.currentUserJoinTenant('tenant1');
                          Col.insert({name:'8'});

                         var res=Col.find();
                          console.log(res);


    }


 });
}
