$(document).ready(function() {
    var ref = new Firebase("https://intense-heat-8777.firebaseio.com");
    ref.child("Properties").on("value", function(properties){
        // Given a DataSnapshot containing a child "fred" and a child "wilma", this callback
        // function will be called twice
        var counter = 0;
        properties.forEach(function(property) {
          
            // key will be "Property1" the first time and "Property2" the second time...etc 
            var key = property.key();
            
            // childData will be the actual contents of the child
            counter++;
            var propertyRef = new Firebase("https://intense-heat-8777.firebaseio.com/Properties");
            propertyRef.child("Property" + counter).on("value", function(attributes){
                var x = attributes.val();
                $("#properties").append('<option value=' + counter + '>' + x.Address + " " + x.City + ", " + x.State + " " + x.Zip + '</option>');
            });
        });
        $(function() {
            $( "#leaseStartDate" ).datepicker();
          });
        $(function() {
            $( "#leaseEndDate" ).datepicker();
          });
        $(function() {
            $( "#depositDate" ).datepicker();
          });
        if($('#trashPickup > option').length < 2)
        {
            var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            $.each(days, function( index, value ) {
              $("#trashPickup").append('<option value=' + index + '>' + value + '</option>');
            });
        }

        $(function(){
            for(x = 1; x < 6; x++)
            {
                $("#numbersAdult").append('<option value=' + x + '>' + x + '</option>');
                $("#numbersChildren").append('<option value=' + x + '>' + x + '</option>');
            }
        });
    });
    $( "#properties" ).change(function() {
        //alert( "Handler for .change() called."  + $('#properties :selected').val());
        PrepopulatePropertyData();

    });
});

function PrepopulatePropertyData(){
    var counter = $('#properties :selected').val();
    var propertyRef = new Firebase("https://intense-heat-8777.firebaseio.com/Properties");
    propertyRef.child("Property" + counter).on("value", function(attributes){
        if(counter > -1)
        {
            //set the input values
            $('#rentAmount').val(attributes.val().RentAmount);
            $('#depositAmount').val(attributes.val().DepositAmount);
            $('#petDepositAmount').val(attributes.val().PetDepositAmount);
            $('#trashPickup').val(attributes.val().TrashDay);
        }
        else
        {
            $('#rentAmount').val('');
            $('#depositAmount').val('');
            $('#petDepositAmount').val('');
            $('#trashPickup').val('-1');
        }
    });
}

function SaveData(){
    
    var ref = new Firebase("https://intense-heat-8777.firebaseio.com/LeaseForm/");
    var usersRef = ref.child("LeaseInfo");
    usersRef.set({
        Property : $( "#properties :selected" ).text(),
        PrimaryTenant : $("#primaryTenant").val(),
        PrimaryPhoneNumber: $('#primaryPhoneNumber').val(),
        SecondaryTenant : $("#secondaryTenant").val(),
        SecondaryPhoneNumber: $('#secondaryPhoneNumber').val(),
        PrimaryEmail: $("#primaryEmail").val(),
        SecondaryEmail: $("#secondaryEmail").val(),
        RentAmount : $('#rentAmount').val(),
        DepositAmount : $("#depositAmount").val(),
        PetDepositAmount : $("#petDepositAmount").val(),
        LeaseStartDate : $( "#leaseStartDate").val(),
        LeaseEndDate: $( "#leaseEndDate").val(),
        DepositDate : $( "#depositDate").val(),
        NumbersAdult : $( "#numbersAdult :selected" ).text(), 
        NumberChildren : $( "#numbersChildren :selected" ).text(),
        TrashPickup : $( "#trashPickup :selected" ).val()
    });
    alert('Data Saved');
}


