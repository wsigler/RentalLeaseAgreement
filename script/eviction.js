$(document).ready(function() {
	var ref = new Firebase("https://intense-heat-8777.firebaseio.com/Forms");
    //Populating the sections of the lease
    ref.child("Eviction").on("value", function(eviction){
		$('#tenant1').html(function() {
	    	return $(this).text().replace('[tenant]', eviction.val().Tenant);
		});
		$('#tenant2').html(function() {
	    	return $(this).text().replace('[tenant]', eviction.val().Tenant);
		});
		$('#address1').html(function() {
	    	return $(this).text().replace('[address]', eviction.val().Property);
		});
		$('#address2').html(function() {
	    	return $(this).text().replace('[address]', eviction.val().Property);
		});
		$('#blurb2').html(function() {
	    	return $(this).text().replace('[address]', eviction.val().Property);
		});
		$('#blurb').html(function() {
	    	return $(this).text().replace('[rent]', eviction.val().RentAmount);
		});
		$('#blurb2').html(function() {
	    	return $(this).text().replace('[county]', eviction.val().County);
		});
		$('#city1').html(function() {
	    	return $(this).text().replace('[city]', eviction.val().City);
		});
		$('#date1').html(function() {
	    	return $(this).text().replace('[date]', eviction.val().Date);
		});
		$('#blurb3').html(function() {
	    	return $(this).text().replace('[date]', eviction.val().Date);
		});
	});
   
    //var ref = new Firebase("https://intense-heat-8777.firebaseio.com/LeaseForm/LeaseInfo");
	//SetPropertyInfo(ref);
});

/*function SetPropertyInfo(ref){
    ref.child("Property").on("value", function(property){
		$('#section1Text').html(function() {
	    	return $(this).text().replace('[property]', property.val());
		});
	});

	ref.child("TrashPickup").on("value", function(trashPickup){
		$('#section6Text').html(function() {
	    	return $(this).text().replace('[trashPickup]', trashPickup.val());
		});
	});
}*/