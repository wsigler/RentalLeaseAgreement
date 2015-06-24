//properties
var nextId;

$(document).ready(function() {
	var ref = new Firebase("https://intense-heat-8777.firebaseio.com/LeaseForm");
    var queryString = getUrlVars();
    var propertyIndex = -1;
    
    $('#btnUpdate').css('display', 'none');
    $('#btnSubmit').css('display', 'inline');
    
    $.each(queryString, function( index, value ) {
          if(value === "id")
          {
            propertyIndex = queryString[value].toString();
          }
        });

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
          
            // key will be "fred" the first time and "wilma" the second time
            var key = property.key();
           	// childData will be the actual contents of the child
            counter++;
            var propertyRef = new Firebase("https://intense-heat-8777.firebaseio.com/LeaseForm/Properties");
            propertyRef.child("Property" + counter).on("value", function(attributes){
                if(propertyIndex > -1)
                {
                    if(propertyIndex == counter)
                    {
                        ;
                        //set the input values
                        $('#btnSubmit').css('display', 'none');
                        $('#btnUpdate').css('display', 'inline');
                        $('#address').val(attributes.val().Address);
                        $('#city').val(attributes.val().City);
                        $('#state').val(attributes.val().State);
                        $('#zip').val(attributes.val().Zip);
                        $('#squareFootage').val(attributes.val().SquareFootage);
                        $('#numberOfBedrooms').val(attributes.val().Bedrooms);
                        $('#numberOfBathrooms').val(attributes.val().Bathrooms);
                        $('#wdConnection').val(attributes.val().WDConnection);
                        $('#centralAC').val(attributes.val().CentralAC);
                    }
                }
                else
                {
            		$("#propertyList").append('<a href="Properties.html?id=' + counter + '">' + attributes.val().Address + ' ' + attributes.val().City +'</a><br/>');
                }
        	});
        });
    });
});

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
    
    var ref = new Firebase("https://intense-heat-8777.firebaseio.com/Properties/");
    var usersRef = ref.child("LeaseInfo");
    usersRef.set({
        Address : $("#address").val(),
        Bathrooms : $( "#numberOfBathrooms option:selected" ).val(),
        Bedrooms : $( "#numberOfBedrooms option:selected" ).val(),
        CentralAC: $( "#centralAC option:selected" ).val(),
        City : $('#city').val(),
        SquareFootage : $("#squareFootage").val(),
        State : $("#state").val(),
        WDConnection : $( "#wdConnection option:selected" ).val(),
        Zip: $("#zip").val()
    });
    alert('Data Saved');
}