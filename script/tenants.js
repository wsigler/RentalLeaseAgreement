//properties
var nextId;

$(document).ready(function() {
	init();
});

function init(){
    var ref = new Firebase("https://intense-heat-8777.firebaseio.com");
    var queryString = getUrlVars();
    var tenantIndex = -1;

    var nextId = 1;
    ref.child("Tenants").on("value", function(tenants){
        tenants.forEach(function(tenant) {
            nextId++;
            $("#nextId").val(nextId);
        });
    });

    $("#btnSubmit").click(function(){ SaveData(); });
    $("#btnSubmit").html('Save');
    $('#primaryHeaders').css('display', 'none');
    $('#secondaryHeaders').css('display', 'none');
    $('#addressHeaders').css('display', 'none');
    $('#paymentHeaders').css('display', 'none');
    $('#occupancyHeadings').css('display', 'none');
    $('#paymentDateHeaders').css('display', 'none');
    $('#paymentRow2').css('margin-top', '10px');
    
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
        $('#paymentRow2').css('margin-top', '0px');
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
                    $('#state').val('');
                    $('#zip').val('');                        

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
    
    var newTenantName = "Tenant" + $("#nextId").val();
    
    var newTenant = new Firebase("https://intense-heat-8777.firebaseio.com/Tenants/");
    var usersRef = newProperty.child(newTenantName);
    usersRef.set({
        DepositAmount : $("#depositAmount").val(),
        DepositDate : $( "#depositDate" ).val(),
        LeaseEndDate : $( "#leaseEndDate" ).val(),
        LeaseStartDate: $( "#leaseStartDate" ).val(),
        NumbersAdult : $( "#numbersAdult :selected" ).text(), 
        NumberChildren : $( "#numbersChildren :selected" ).text(),
        PetDeposit : $("#petDepositAmount").val(),
        PrimaryEmail : $( "#primaryEmail" ).val(),
        PrimaryName: $("#PrimaryName").val(),
        PrimaryPhone: $('#primaryPhoneNumber').val(),
        Property: $('#properties :selected').val(),
        RentAmount: $('#rentAmount').val(),
        SecondaryEmail : $( "#secondaryEmail" ).val(),
        SecondaryName: $("#secondaryName").val(),
        SecondaryPhone: $('#secondaryPhoneNumber').val()
    });

    alert('Data Saved');
    window.location.href("index.html");
}

function EditData(){
    var queryString = getUrlVars();
    var tenantIndex = -1;
    
    $.each(queryString, function( index, value ) {
      if(value === "id")
      {
        tenantIndex = queryString[value].toString();
      }
    });
    var newTenantName = "Tenant" + tenantIndex;
    
    var newTenant = new Firebase("https://intense-heat-8777.firebaseio.com/Tenants/");
    var usersRef = newTenant.child(newTenantName);
    usersRef.set({
        DepositAmount : $("#depositAmount").val(),
        DepositDate : $( "#depositDate" ).val(),
        LeaseEndDate : $( "#leaseEndDate" ).val(),
        LeaseStartDate: $( "#leaseStartDate" ).val(),
        NumbersAdult : $( "#numbersAdult :selected" ).text(), 
        NumberChildren : $( "#numbersChildren :selected" ).text(),
        PetDeposit : $("#petDepositAmount").val(),
        PrimaryEmail : $( "#primaryEmail" ).val(),
        PrimaryName: $("#PrimaryName").val(),
        PrimaryPhone: $('#primaryPhoneNumber').val(),
        Property: $('#properties :selected').val(),
        RentAmount: $('#rentAmount').val(),
        SecondaryEmail : $( "#secondaryEmail" ).val(),
        SecondaryName: $("#secondaryName").val(),
        SecondaryPhone: $('#secondaryPhoneNumber').val()
    });
    alert('Data Updated');
    window.location.href("index.html");
}