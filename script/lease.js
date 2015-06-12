$(document).ready(function() {
    // Get a database reference to our posts
	var ref = new Firebase("https://intense-heat-8777.firebaseio.com/LeaseForm/LeaseInfo");
	ref.child("PrimaryTenant").on("value", function(primaryTenant){
		$('#section1Text').html(function() {
	    	return $(this).text().replace('[primaryTenant]', primaryTenant.val());
		});
		$('#section1Text').html(function() {
	    	return $(this).text().replace('[primaryTenant]', primaryTenant.val());
		});
		$('#printPrimaryTenant').html(function() {
	    	return $(this).text().replace('[primaryTenant]', primaryTenant.val());
		});
	});

	ref.child("SecondaryTenant").on("value", function(secondaryTenant){
		$('#section1Text').html(function() {
			if(secondaryTenant.val() !== null)
			{
	    		return $(this).text().replace('[secondaryTenant]', 'and ' + secondaryTenant.val());
			}
			else
			{
				return $(this).text().replace('[secondaryTenant]', '');	
			}
		});
		$('#section1Text').html(function() {
			if(secondaryTenant.val() !== null)
			{
	    		return $(this).text().replace('[secondaryTenant]', 'and ' + secondaryTenant.val());
			}
			else
			{
				return $(this).text().replace('[secondaryTenant]', '');	
			}
		});
		$('#printSecondaryTenant').html(function() {
	    	if(secondaryTenant.val() !== null)
			{
	    		return $(this).text().replace('[secondaryTenant]', secondaryTenant.val());
			}
			else
			{
				return $(this).text().replace('[secondaryTenant]', 'None');	
			}
		});
	});

	ref.child("Property").on("value", function(property){
		$('#section1Text').html(function() {
	    	return $(this).text().replace('[property]', property.val());
		});
	});
	
	ref.child("LeaseStartDate").on("value", function(leaseStartDate){
		$('#section1Text').html(function() {
	    	return $(this).text().replace('[leaseStartDate]', leaseStartDate.val());
		});
	});

	ref.child("LeaseEndDate").on("value", function(leaseEndDate){
		$('#section1Text').html(function() {
	    	return $(this).text().replace('[leaseEndDate]', leaseEndDate.val());
		});
	});

	ref.child("RentAmount").on("value", function(rentAmount){
		$('#section1Text').html(function() {
	    	return $(this).text().replace('[rentAmount]', rentAmount.val());
		});
	});
	
	ref.child("DepositAmount").on("value", function(deposit){
		$('#section1Text').html(function() {
	    	return $(this).text().replace('[deposit]', deposit.val());
		});
	});

	ref.child("DepositDate").on("value", function(depositDate){
		$('#section1Text').html(function() {
	    	return $(this).text().replace('[depositDate]', depositDate.val());
		});
	});

	ref.child("NumbersAdult").on("value", function(numbersAdult){
		$('#section3Text li').html(function() {
	    	return $(this).text().replace('[numbersAdult]', numbersAdult.val());
		});
	});

	ref.child("NumberChildren").on("value", function(numberChildren){
		$('#section3Text li').html(function() {
	    	return $(this).text().replace('[numberChildren]', numberChildren.val());
		});
	});

	ref.child("TrashPickup").on("value", function(trashPickup){
		$('#section6Text').html(function() {
	    	return $(this).text().replace('[trashPickup]', trashPickup.val());
		});
	});

	ref.child("PetDepositAmount").on("value", function(petDeposit){
		$('#section9Text').html(function() {
	    	return $(this).text().replace('[petDeposit]', petDeposit.val());
		});
	});
});
