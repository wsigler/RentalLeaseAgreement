
$(document).ready(function() {
    onInit();
});

function onInit(){
    var nextId = 1;
    var ref = new Firebase("https://intense-heat-8777.firebaseio.com/");
    ref.child("Tenants").on("value", function(tenants){
        tenants.forEach(function(tenant) {
            nextId++;
            $("#nextId").val(nextId);
        });
    });
    
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
    });

    SetDatePicker("leaseStartDate");
    SetDatePicker("leaseEndDate");
    SetDatePicker("depositDate");
    
    SetDropdowns();

    $( "#properties" ).change(function() {
        PrepopulatePropertyData();
    });

    $('#leaseDepositRow2').css('margin-top', '10px');
}

function SetDropdowns(){
    if($('#trashPickup > option').length < 2)
    {
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        $.each(days, function( index, value ) {
          $("#trashPickup").append('<option value=' + index + '>' + value + '</option>');
        });
    }
}

function SetDatePicker(dateField){
    $(function() {
        $( "#" + dateField ).datepicker();
      });
}

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
    SaveLeaseInfo();
    alert('Data Saved');
}

function SaveLeaseInfo(){
    var ref = new Firebase("https://intense-heat-8777.firebaseio.com/LeaseForm/");
    var usersRef = ref.child("BlankLease");
    usersRef.set({
        Property : $( "#properties :selected" ).text(),
        PrimaryTenant : "_____________________________________________",
        PrimaryPhoneNumber: "9999999999",
        SecondaryTenant : "_____________________________________________",
        SecondaryPhoneNumber: "9999999999",
        PrimaryEmail: "none",
        SecondaryEmail: "none",
        RentAmount : $('#rentAmount').val(),
        DepositAmount : $("#depositAmount").val(),
        PetDepositAmount : $("#petDepositAmount").val(),
        LeaseStartDate : $( "#leaseStartDate").val(),
        LeaseEndDate: $( "#leaseEndDate").val(),
        DepositDate : $( "#depositDate").val(),
        NumbersAdult : "_____________", 
        NumberChildren : "_____________",
        TrashPickup : $( "#trashPickup :selected" ).text()
    });
}
