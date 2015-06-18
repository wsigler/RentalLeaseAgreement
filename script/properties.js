//properties
var nextId;

$(document).ready(function() {
	var ref = new Firebase("https://intense-heat-8777.firebaseio.com/LeaseForm");
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
        		var proList = attributes.val();

                $("#propertyList").append('<a href="Properties.html?id=' + counter + '">' + proList.Address + ' ' + proList.City +'</a><br/>');
        	});
        	
        });
        //$("#propertyList").css("", "");
    });
    
    $(function(){
        for(x = 1; x < 5; x++)
        {
            $("#numberOfBedrooms").append('<option value=' + x + '>' + x + '</option>');
            $("#numberOfBathrooms").append('<option value=' + x + '>' + x + '</option>');
        }
    });
    $("#propertyList").css("overflow-y", "scroll");
});

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