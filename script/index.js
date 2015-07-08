$(document).ready(function() {
    init();
});
function init(){
    var ref = new Firebase("https://intense-heat-8777.firebaseio.com");
    ref.child("Properties").on("value", function(properties){
        // Given a DataSnapshot containing a child "fred" and a child "wilma", this callback
        // function will be called twice
        var counter = 0;
        properties.forEach(function(property) {
          
            var key = property.key();
            // childData will be the actual contents of the child
            counter++;
            var propertyRef = new Firebase("https://intense-heat-8777.firebaseio.com/Properties");
            propertyRef.child("Property" + counter).on("value", function(attributes){
                $('#propertyList > tbody:last-child').append('<tr><td>' + counter + '</td><td>' + attributes.val().Address + '</td><td>' + attributes.val().City + '</td><td>' + attributes.val().State + '</td><td>' + attributes.val().Zip + '</td><td><a href="PropertyManagement.html?id=' + counter + '">View</a></td></tr>');
            });
        });
    });
    counter = 0;
    ref.child("Tenants").on("value", function(tenants){
        tenants.forEach(function(tenant){
            var key = tenant.key();
            counter++;
            var tenantRef = new Firebase("https://intense-heat-8777.firebaseio.com/Tenants");
            tenantRef.child("Tenant" + counter).on("value", function(attributes){
            $('#tenantList > tbody:last-child').append('<tr><td>' + counter + '</td><td>' + attributes.val().Property + '</td><td>' + attributes.val().PrimaryName + '</td><td>' + attributes.val().SecondaryName + '</td><td><a href="TenantManagement.html?id="' + counter + '>View</a></td></tr>');
            });
        });
    });
}