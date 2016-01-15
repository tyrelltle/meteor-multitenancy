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


    Meteor.loginWithPassword('a@a.a', 'a', function () {
        console.log('current user id: ' + Meteor.userId());
        Meteor.call('asd');


    });
}

Col = ZimoloMT.Collection('col');
//Col=new Mongo.Collection('col');
if (Meteor.isServer) {
    Meteor.startup(function () {
        Meteor.users.remove({});
        Accounts.createUser({username: 'asd', email: 'a@a.a', password: 'a'});
        var user = Meteor.users.findOne();

        if (ZimoloMT.getTenant('tenant1') == undefined)
            ZimoloMT.registerNewTenant(user._id, 'tenant1');

        if (ZimoloMT.getTenant('tenant2') == undefined)

            ZimoloMT.registerNewTenant(user._id, 'tenant2');

        ZimoloMT.registerNewTenantMember('tenant1',user._id);
        ZimoloMT.registerNewTenantMember('tenant2',user._id);

    });


    Meteor.methods({
        'asd': function () {
            ZimoloMT.currentUserJoinTenant('tenant1');
            Col.remove({});
            Col.insert({name: '1'});
            Col.insert({name: '2'});
            var res = Col.find();
            console.log('==== '+res.count());
            ZimoloMT.currentUserJoinTenant('tenant1');
            Col.remove({});

            Col.insert({name: '8'});

            var res = Col.find();
            console.log('==== '+res.count());


        }


    });
}
