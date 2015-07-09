//properties
var nextId;

$(document).ready(function() {
	init();
});

function init(){
    var counter = 1;
    var ref = new Firebase("https://intense-heat-8777.firebaseio.com/");
    ref.child("Properties").on("value", function(properties){
        properties.forEach(function(property) {
            counter++;
            $("#nextId").val(counter);
        });
    });
    
    var queryString = getUrlVars();
    var propertyIndex = -1;
    
    if($('#trashPickup > option').length < 2)
    {
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        $.each(days, function( index, value ) {
          $("#trashPickup").append('<option value=' + index + '>' + value + '</option>');
        });
    }
    
    var isNew = true;

    $.each(queryString, function( index, value ) {
      if(value === "id")
      {
        propertyIndex = queryString[value].toString();
        $("#btnSubmit").click(function(){ EditData(); });
        $("#btnSubmit").html('Update');
        $('#addressHeaders').css('display', 'inline');
        $('#paymentHeaders').css('display', 'inline');
        $('#amenitiesHeaders').css('display', 'inline');
        $('#amenitiesHeaders2').css('display', 'inline');  
        $('#amenitiesRow2').css('margin-top', '0px');
        isNew = false;
      }
    });

    if(isNew)
    {
        $("#btnSubmit").click(function(){ SaveData(); });
        $("#btnSubmit").html('Save');
        $('#addressHeaders').css('display', 'none');
        $('#paymentHeaders').css('display', 'none');
        $('#amenitiesHeaders').css('display', 'none');
        $('#amenitiesHeaders2').css('display', 'none');
        $('#amenitiesRow2').css('margin-top', '10px');
    }
    $(function(){
        for(x = 1; x < 5; x++)
        {
            $("#numberOfBedrooms").append('<option value=' + x + '>' + x + '</option>');
            $("#numberOfBathrooms").append('<option value=' + x + '>' + x + '</option>');
        }
    });
    
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
                if(propertyIndex > -1)
                {
                    if(propertyIndex == counter)
                    {
                        //set the input values
                        $('#address').val(attributes.val().Address);
                        $('#city').val(attributes.val().City);
                        $('#state').val(attributes.val().State);
                        $('#zip').val(attributes.val().Zip);
                        $('#squareFootage').val(attributes.val().SquareFootage);
                        $('#numberOfBedrooms').val(attributes.val().Bedrooms);
                        $('#numberOfBathrooms').val(attributes.val().Bathrooms);
                        $('#wdConnection').val(attributes.val().WDConnection);
                        $('#centralAC').val(attributes.val().CentralAC);
                        $('#rentAmount').val(attributes.val().RentAmount);
                        $('#depositAmount').val(attributes.val().DepositAmount);
                        $('#petDepositAmount').val(attributes.val().PetDepositAmount);
                        $('#trashPickup').val(attributes.val().TrashDay);
                    }
                }
                else
                {
                    $('#address').val('');
                    $('#city').val('');
                    $('#state').val('');
                    $('#zip').val('');
                    $('#rentAmount').val('');
                    $('#depositAmount').val('');
                    $('#petDepositAmount').val('');
                    $('#squareFootage').val('');
                    $('#numberOfBedrooms').val('-1');
                    $('#numberOfBathrooms').val('-1');
                    $('#rentAmount').val('');
                    $('#depositAmount').val('');
                    $('#petDepositAmount').val('');
                    $('#trashPickup').val('-1');
                }
            });
        });
    });
}
function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function SaveData(){
    
    var newPropertyName = "Property" + $("#nextId").val();
    
    var newProperty = new Firebase("https://intense-heat-8777.firebaseio.com/Properties/");
    var usersRef = newProperty.child(newPropertyName);
    usersRef.set({
        Address : $("#address").val(),
        Bathrooms : $( "#numberOfBathrooms option:selected" ).val(),
        Bedrooms : $( "#numberOfBedrooms option:selected" ).val(),
        CentralAC: $( "#centralAC option:selected" ).val(),
        City : $('#city').val(),
        SquareFootage : $("#squareFootage").val(),
        State : $("#state").val(),
        WDConnection : $( "#wdConnection option:selected" ).val(),
        Zip: $("#zip").val(),
        RentAmount: $('#rentAmount').val(),
        DepositAmount: $('#depositAmount').val(),
        PetDepositAmount: $('#petDepositAmount').val(),
        TrashDay: $('#trashPickup').val()
    });
    
    alert('Data Saved');
    window.location.href = "index.html";
}
function EditData(){
    var queryString = getUrlVars();
    var propertyIndex = -1;
    
    $.each(queryString, function( index, value ) {
      if(value === "id")
      {
        propertyIndex = queryString[value].toString();
      }
    });
    var newPropertyName = "Property" + propertyIndex;
    
    var newProperty = new Firebase("https://intense-heat-8777.firebaseio.com/Properties/");
    var usersRef = newProperty.child(newPropertyName);
    usersRef.set({
        Address : $("#address").val(),
        Bathrooms : $( "#numberOfBathrooms option:selected" ).val(),
        Bedrooms : $( "#numberOfBedrooms option:selected" ).val(),
        CentralAC: $( "#centralAC option:selected" ).val(),
        City : $('#city').val(),
        SquareFootage : $("#squareFootage").val(),
        State : $("#state").val(),
        WDConnection : $( "#wdConnection option:selected" ).val(),
        Zip: $("#zip").val(),
        RentAmount: $('#rentAmount').val(),
        DepositAmount: $('#depositAmount').val(),
        PetDepositAmount: $('#petDepositAmount').val(),
        TrashDay: $('#trashPickup').val()
    });
    
    
    $("#propertyList a").remove();
    $("#propertyList br").remove();
    alert('Data Updated');
    window.location.href = "index.html";
}