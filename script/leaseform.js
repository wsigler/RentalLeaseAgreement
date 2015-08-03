
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
    
    SetDatePicker("leaseStartDate");
    SetDatePicker("leaseEndDate");
    SetDatePicker("depositDate");
    
    $('#primaryPhoneNumber').focusout(function(){
        SetPhoneMask('primaryPhoneNumber');
    });
    $('#secondaryPhoneNumber').focusout(function(){
        SetPhoneMask('secondaryPhoneNumber');
    });
    
    SetDropdowns();

    $('#leaseDepositRow2').css('margin-top', '10px');
    var queryString = getUrlVars();
    var tenantIndex = -1;
    $.each(queryString, function( index, value ) {
        tenantIndex = (value === "id") ? queryString[value] : -1;
    });
    LoadTenantInfo(tenantIndex);
}

function SetPropertyDD(selectedValue){
    var ref = new Firebase("https://intense-heat-8777.firebaseio.com/");
    ref.child("Properties").on("value", function(properties){
        // Given a DataSnapshot containing a child "fred" and a child "wilma", this callback
        // function will be called twice
        var counter = 0;
        properties.forEach(function(property) {
            counter++;
            var propertyRef = new Firebase("https://intense-heat-8777.firebaseio.com/Properties");
            propertyRef.child("Property" + counter).on("value", function(attributes){
                if(selectedValue == counter){
                    $("#properties").append('<option selected value=' + counter + '>' + attributes.val().Address + " " + attributes.val().City + ", " + attributes.val().State + " " + attributes.val().Zip + '</option>');
                }
                else{
                    $("#properties").append('<option value=' + counter + '>' + attributes.val().Address + " " + attributes.val().City + ", " + attributes.val().State + " " + attributes.val().Zip + '</option>');
                }
                
            });
        });
        $( "#properties" ).change(function() {
            PrepopulatePropertyData();
        });
    });

}

function LoadTenantInfo(tenantIndex){
    if(tenantIndex > -1)
    {
        var tenantRef = new Firebase("https://intense-heat-8777.firebaseio.com/Tenants");
        tenantRef.child("Tenant" + tenantIndex).on("value", function(attributes){
            var pPhone = attributes.val().PrimaryPhone.toString();
            var formatedPhone = (pPhone.length === 10) ? '(' + pPhone.substr(0, 3) + ') ' + pPhone.substr(3, 3) + '-' + pPhone.substr(6,4) : pPhone;
            
            var sPhone = attributes.val().SecondaryPhone.toString();
            var formatedSPhone = (sPhone.length === 10) ? '(' + sPhone.substr(0, 3) + ') ' + sPhone.substr(3, 3) + '-' + sPhone.substr(6,4) : sPhone;
            
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

            $('#numbersAdult').val(attributes.val().NumbersAdult);
            $('#numbersChildren').val(attributes.val().NumberChildren);
            SetPropertyDD(attributes.val().Property);
        });
     }
     else{
        $('#primaryTenant').val('');
        $('#primaryPhoneNumber').val('');
        $('#primaryEmail').val('');

        $('#secondaryTenant').val('');
        $('#secondaryPhoneNumber').val('');
        $('#secondaryEmail').val('');

        $('#leaseStartDate').val('');
        $('#leaseEndDate').val('');
        $('#depositDate').val('');

        $('#rentAmount').val('');
        $('#depositAmount').val('');
        $('#petDepositAmount').val('');

        $('#numbersAdult').val('0');
        $('#numbersChildren').val('0');
        SetPropertyDD(0);
     }           
}

function SetDropdowns(){
    if($('#trashPickup > option').length < 2)
    {
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        $.each(days, function( index, value ) {
          $("#trashPickup").append('<option value=' + index + '>' + value + '</option>');
        });
    }

    $(function(){
        for(x = 0; x < 6; x++)
        {
            $("#numbersAdult").append('<option value=' + x + '>' + x + '</option>');
            $("#numbersChildren").append('<option value=' + x + '>' + x + '</option>');
        }
    });
}

function SetDatePicker(dateField){
    $(function() {
        $( "#" + dateField ).datepicker();
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
    var queryString = getUrlVars();
    var tenantIndex = -1;
    $.each(queryString, function( index, value ) {
        tenantIndex = (value === "id") ? queryString[value] : -1;
    });
    if(tenantIndex === -1){    
        SaveTenantInfo();
    }
    alert('Data Saved');
}

function SaveLeaseInfo(){
    var ref = new Firebase("https://intense-heat-8777.firebaseio.com/LeaseForm/");
    var usersRef = ref.child("LeaseInfo");
    usersRef.set({
        Property : $( "#properties :selected" ).text(),
        PrimaryTenant : $("#primaryTenant").val(),
        PrimaryPhoneNumber: $('#primaryPhoneNumber').val(),
        PrimaryEmail: $("#primaryEmail").val(),
        SecondaryTenant : $("#secondaryTenant").val(),
        SecondaryPhoneNumber: $('#secondaryPhoneNumber').val(),
        SecondaryEmail: $("#secondaryEmail").val(),
        RentAmount : $('#rentAmount').val(),
        DepositAmount : $("#depositAmount").val(),
        PetDepositAmount : $("#petDepositAmount").val(),
        LeaseStartDate : $( "#leaseStartDate").val(),
        LeaseEndDate: $( "#leaseEndDate").val(),
        DepositDate : $( "#depositDate").val(),
        NumbersAdult : $( "#numbersAdult :selected" ).text(), 
        NumberChildren : $( "#numbersChildren :selected" ).text(),
        TrashPickup : $( "#trashPickup :selected" ).text()
    });
}

function SaveTenantInfo(){

    var newTenantName = "Tenant" + $("#nextId").val();
    
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
        PrimaryName: $("#primaryTenant").val(),
        PrimaryPhone: $('#primaryPhoneNumber').val(),
        Property: $('#properties :selected').val(),
        RentAmount: $('#rentAmount').val(),
        SecondaryEmail : $("#secondaryEmail").val(),
        SecondaryName: $("#secondaryTenant").val(),
        SecondaryPhone: $('#secondaryPhoneNumber').val(),
        Active: 1
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



