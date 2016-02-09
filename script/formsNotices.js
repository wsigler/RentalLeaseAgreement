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
                $("#properties").append('<option value=' + counter + '>' + attributes.val().Address + " " + attributes.val().City + ", " + attributes.val().State + " " + attributes.val().Zip + '</option>');
            });
        });
    });
    SetDatePicker("evictionDate");
/*
    
    counter = 0;
    ref.child("Tenants").on("value", function(tenants){
        tenants.forEach(function(tenant){
            var key = tenant.key();
            counter++;
            var tenantRef = new Firebase("https://intense-heat-8777.firebaseio.com/Tenants");
            tenantRef.child("Tenant" + counter).on("value", function(attributes){
                if(attributes.val().Active.toString() === "1"){
                    $('#tenantList > tbody:last-child').append('<tr><td>' + counter + '</td><td>' + attributes.val().Property + '</td><td>' + attributes.val().PrimaryName + '</td><td>' + attributes.val().SecondaryName + '</td><td><a href="TenantManagement.html?id=' + counter + '"">View</a></td></tr>');
                }
                else if(attributes.val().Active.toString() === "0"){
                    $('#archivedTenantList > tbody:last-child').append('<tr><td>' + counter + '</td><td>' + attributes.val().Property + '</td><td>' + attributes.val().PrimaryName + '</td><td>' + attributes.val().SecondaryName + '</td><td><a href="TenantManagement.html?id=' + counter + '"">View</a></td></tr>');
                }
            });
        });
    });
    */
}

function SetDatePicker(dateField){
    $(function() {
        $( "#" + dateField ).datepicker();
      });
}

function PrintEviction(){
    var propertyId = $( "#properties :selected" ).val();
    var counter = 0;
    var address = "";
    var city = "";


    var ref = new Firebase("https://intense-heat-8777.firebaseio.com");
    ref.child("Properties").on("value", function(properties){
        var propertyRef = new Firebase("https://intense-heat-8777.firebaseio.com/Properties");
        propertyRef.child("Property" + propertyId).on("value", function(attributes){
            address = attributes.val().Address;
            city = attributes.val().City;
            ref.child("Tenants").on("value", function(tenants){
                tenants.forEach(function(tenant){
                    var key = tenant.key();
                    counter++;
                    var tenantRef = new Firebase("https://intense-heat-8777.firebaseio.com/Tenants");
                    tenantRef.child("Tenant" + counter).on("value", function(attributes){
                        if(attributes.val().Active.toString() === "1" && attributes.val().Property === propertyId){
                            //alert(attributes.val().PrimaryName);
                            SaveValues(attributes.val().PrimaryName, address, city);
                            window.location.href = "EvictionNotice.html";
                        }
                    });
                });
            });
        });
    });
     
}

function SaveValues(tenant, address, city){
    ref = new Firebase("https://intense-heat-8777.firebaseio.com/Forms/");
    var usersRef = ref.child("Eviction");
    usersRef.set({
        Property : address,
        City : city,
        Tenant : tenant,
        Date : $( "#evictionDate").val(),
        RentAmount : $('#rentAmount').val()
    });

    alert("Data Saved");
}