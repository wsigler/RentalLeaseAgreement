//properties
var nextId;

$(document).ready(function() {
	init();
});

function init(){
    var ref = new Firebase("https://intense-heat-8777.firebaseio.com");
    var queryString = getUrlVars();
    var tenantIndex = -1;
    
    $.each(queryString, function( index, value ) {
      if(value === "id")
      {
        tenantIndex = queryString[value].toString();
        $("#btnSubmit").click(function(){ EditData(); });
        $("#btnSubmit").html('Update');
        $('#primaryHeaders').css('display', 'inline');
        $('#secondaryHeaders').css('display', 'inline');
        $('#addressHeaders').css('display', 'inline');
        $('#paymentHeaders').css('display', 'inline');
        $('#occupancyHeadings').css('display', 'inline');
        $('#paymentDateHeaders').css('display', 'inline');
      }
      else
      {
        $("#btnSubmit").click(function(){ SaveData(); });
        $("#btnSubmit").html('Save');
        $('#primaryHeaders').css('display', 'none');
        $('#secondaryHeaders').css('display', 'none');
        $('#addressHeaders').css('display', 'none');
        $('#paymentHeaders').css('display', 'none');
        $('#occupancyHeadings').css('display', 'none');
        $('#paymentDateHeaders').css('display', 'none');
        $('#paymentRow2').css('margin-top', '10px');
      }
    });
    SetDatePickers();
    SetDropdowns();
    $('#primaryPhoneNumber').focusout(function(){
        SetPhoneMask('primaryPhoneNumber');
    });
    $('#secondaryPhoneNumber').focusout(function(){
        SetPhoneMask('secondaryPhoneNumber');
    });
    
    
    ref.child("Tenants").on("value", function(properties){
        // Given a DataSnapshot containing a child "fred" and a child "wilma", this callback
        // function will be called twice
        var counter = 0;
        properties.forEach(function(tenant) {
          
            var key = tenant.key();
            // childData will be the actual contents of the child
            counter++;
            var tenantRef = new Firebase("https://intense-heat-8777.firebaseio.com/Tenants");
            tenantRef.child("Tenant" + counter).on("value", function(attributes){
                if(tenantIndex > -1)
                {
                    if(tenantIndex == counter)
                    {
                        var pPhone = attributes.val().PrimaryPhone.toString();
                        var formatedPhone = (pPhone.length === 10) ? '(' + pPhone.substr(0, 3) + ') ' + pPhone.substr(3, 3) + '-' + pPhone.substr(6,4) : pPhone;
                        
                        var sPhone = attributes.val().SecondaryPhone.toString();
                        var formatedSPhone = (sPhone.length === 10) ? '(' + sPhone.substr(0, 3) + ') ' + sPhone.substr(3, 3) + '-' + sPhone.substr(6,4) : sPhone;
                        var propertyId = attributes.val().Property.toString();

                        propertyRef = new Firebase("https://intense-heat-8777.firebaseio.com/Properties");
                        propertyRef.child("Property" + propertyId).on("value", function(propAttr){
                            //TODO: For address, need to call the property json
                        $('#address').val(propAttr.val().Address);
                        $('#city').val(propAttr.val().City);
                        $('#state').val(propAttr.val().State);
                        $('#zip').val(propAttr.val().Zip);          
                        });
                        
                        $('#primaryTenant').val(attributes.val().PrimaryName);
                        $('#primaryPhoneNumber').val(formatedPhone);
                        $('#primaryEmail').val(attributes.val().PrimaryEmail);

                        $('#secondaryTenant').val(attributes.val().SecondaryName);
                        $('#secondaryPhoneNumber').val(formatedSPhone);
                        $('#secondaryEmail').val(attributes.val().SecondaryEmail);

                        $('#leaseStartDate').val(attributes.val().LeaseStartDate);
                        $('#leaseEndDate').val(attributes.val().LeaseEndDate);
                        $('#depositDate').val(attributes.val().DepositDate);

                        $('#rentAmount').val(attributes.val().RentAmount);
                        $('#depositAmount').val(attributes.val().DepositAmount);
                        $('#petDepositAmount').val(attributes.val().PetDeposit);

                        $('#numbersAdult').val(attributes.val().NumberAdults);
                        $('#numbersChildren').val(attributes.val().NumberChildren);
                        
                    }
                }
                else
                {
                    $('#primaryTenant').val('');
                    $('#primaryPhoneNumber').val('');
                    $('#primaryEmail').val('');

                    $('#secondaryTenant').val('');
                    $('#secondaryPhoneNumber').val('');
                    $('#secondaryEmail').val('');

                    $('#address').val('');
                    $('#city').val('');
                    //$('#state').val('');
                    //$('#zip').val('');                        

                    $('#leaseStartDate').val('');
                    $('#leaseEndDate').val('');
                    $('#depositDate').val('');

                    $('#rentAmount').val('');
                    $('#depositAmount').val('');
                    $('#petDepositAmount').val('');

                    $('#numbersAdult').val('0');
                    $('#numbersChildren').val('0');
                    
                }
            });
        });
    });
}

function SetPhoneMask(phoneField)
{
    if($('#' + phoneField).val().length === 10)
    {
        $('#' + phoneField).val(function(i, text) {
            var regex = new RegExp('(\\d{3})(\\d{3})(\\d{4})');
            var text = text.replace(regex, "($1) $2-$3");
            return text;
        });
    }
}

function SetDropdowns()
{
    $(function(){
        for(x = 1; x < 6; x++)
        {
            $("#numbersAdult").append('<option value=' + x + '>' + x + '</option>');
            $("#numbersChildren").append('<option value=' + x + '>' + x + '</option>');
        }
    });
}

function SetDatePickers()
{
    $(function() {
            $( "#leaseStartDate" ).datepicker();
          });
        $(function() {
            $( "#leaseEndDate" ).datepicker();
          });
        $(function() {
            $( "#depositDate" ).datepicker();
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
    
    var counter = 0;
    var ref = new Firebase("https://intense-heat-8777.firebaseio.com/");
    ref.child("Properties").on("value", function(properties){
        properties.forEach(function(property) {
            counter++;
        });
    });
    counter++;
    var newPropertyName = "Property" + counter;
    
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
        PetDepositAmount: $('#petDepositAmount').val()
        
    });
    
    
    $("#propertyList a").remove();
    $("#propertyList br").remove();
    alert('Data Saved');
    init();
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
        PetDepositAmount: $('#petDepositAmount').val()
    });
    
    
    $("#propertyList a").remove();
    $("#propertyList br").remove();
    alert('Data Updated');
    init();
}