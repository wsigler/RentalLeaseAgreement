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
           	var row$ = $("<tr/>");
            // childData will be the actual contents of the child
            counter++;
            var propertyRef = new Firebase("https://intense-heat-8777.firebaseio.com/LeaseForm/Properties");
            propertyRef.child("Property" + counter).on("value", function(attributes){
        		var proList = attributes.val();
        		row$.append($('<td/>').html(proList.Address));
        		row$.append($('<td/>').html(proList.City));
        		row$.append($('<td/>').html(proList.State));
        		row$.append($('<td/>').html(proList.Zip));
        		row$.append($('<td/>').html(proList.Bedrooms));
        		row$.append($('<td/>').html(proList.Bathrooms));
        		row$.append($('<td/>').html(proList.SquareFootage));
        		row$.append($('<td style="text-align:center"/>').html(proList.WDConnection));
        		row$.append($('<td/>').html(proList.CentralAC));
        	});
        	$("#propertiesList").append(row$);
        });
    });
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