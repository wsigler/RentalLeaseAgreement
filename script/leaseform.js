$(document).ready(function() {
    var ref = new Firebase("https://intense-heat-8777.firebaseio.com/LeaseForm");
    ref.child("Properties").on("value", function(properties){
        // Given a DataSnapshot containing a child "fred" and a child "wilma", this callback
        // function will be called twice
        var counter = 0;
        properties.forEach(function(property) {
          
            // key will be "Property1" the first time and "Property2" the second time...etc 
            var key = property.key();
            
            // childData will be the actual contents of the child
            counter++;
            var propertyRef = new Firebase("https://intense-heat-8777.firebaseio.com/LeaseForm/Properties");
            propertyRef.child("Property" + counter).on("value", function(attributes){
                var x = attributes.val();
                $("#properties").append('<option value=' + counter + '>' + x.Address + " " + x.City + ", " + x.State + " " + x.Zip + '</option>');
            });
        });
    });
});

function SaveData(){
    
    var ref = new Firebase("https://intense-heat-8777.firebaseio.com/LeaseForm/");
    var usersRef = ref.child("LeaseInfo");
    usersRef.set({
        Property : $( "#properties option:selected" ).text(),
        PrimaryTenant : $("#primaryTenant").val(),
        PrimaryPhoneNumber: $('#primaryPhoneNumber').val(),
        SecondaryTenant : $("#secondaryTenant").val(),
        SecondaryPhoneNumber: $('#secondaryPhoneNumber').val(),
        PrimaryEmail: $("#primaryEmail").val(),
        SecondaryEmail: $("#secondaryEmail").val(),
        RentAmount : $('#rentAmount').val(),
        DepositAmount : $("#depositAmount").val(),
        PetDepositAmount : $("#petDepositAmount").val(),
        LeaseStartDate : $( "#leaseStartMonths option:selected" ).text() + ", " +  $( "#leaseStartYears option:selected" ).text(),
        LeaseEndDate: $( "#leaseEndMonths option:selected" ).text() + ", " +  $( "#leaseEndYears option:selected" ).text(),
        DepositDate : $( "#depositMonths option:selected" ).text() + ", " + $( "#depositYears option:selected" ).text(),
        NumbersAdult : $( "#numbersAdult option:selected" ).text(), 
        NumberChildren : $( "#numbersChildren option:selected" ).text(),
        TrashPickup : $( "#trashPickup option:selected" ).text()
    });
    alert('Data Saved');
}


