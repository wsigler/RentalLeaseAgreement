$(document).ready(function() {
    var ref = new Firebase("https://intense-heat-8777.firebaseio.com/LeaseForm");
    ref.child("Properties").on("value", function(properties){
        // Given a DataSnapshot containing a child "fred" and a child "wilma", this callback
        // function will be called twice
        var counter = 0;
        properties.forEach(function(property) {
          
            // key will be "fred" the first time and "wilma" the second time
            var key = property.key();
            var address = "[address] [city], [state] [zip]";
            
            // childData will be the actual contents of the child
            counter++;
            var propertyRef = new Firebase("https://intense-heat-8777.firebaseio.com/LeaseForm/Properties");
            propertyRef.child("Property" + counter).on("value", function(attributes){
                attributes.forEach(function(cs){
                    switch(cs.key()){
                        case "Address":
                            address = address.replace('[address]', cs.val());
                            break;
                        case "City":
                            address = address.replace('[city]', cs.val());
                            break;
                        case "State":
                            address = address.replace('[state]', cs.val());
                            break;
                        case "Zip":
                            address = address.replace('[zip]', cs.val());
                            break;
                        default:
                            break;
                    }
                });

            });
            $("#properties").append('<option value=' + counter + '>' + address + '</option>');
        });
    });

    
});
function SaveData(){
    
    var ref = new Firebase("https://intense-heat-8777.firebaseio.com/LeaseForm/");
    var usersRef = ref.child("LeaseInfo");
    usersRef.set({
        Property : $( "#properties option:selected" ).text(),
        PrimaryTenant : $("#primaryTenant").val(),
        SecondaryTenant : $("#secondaryTenant").val(),
        EmailAddress: $("#emailAddress").val(),
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


