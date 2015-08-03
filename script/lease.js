$(document).ready(function() {
	var sects = new Firebase("https://intense-heat-8777.firebaseio.com/LeaseForm");
    //Populating the sections of the lease
    sects.child("Sections").on("value", function(sections){
		var counter = 0;
	    sections.forEach(function(section) {
	      	var key = section.key();
	        counter++;
	        PopulateSections("Section" + counter, "headSection" + counter, "section" + counter + "Text");
	    });
    });
    var ref = new Firebase("https://intense-heat-8777.firebaseio.com/LeaseForm/LeaseInfo");
	SetTenantInfo(ref);
    SetPropertyInfo(ref);
    SetDateInfo(ref);
    SetAmountInfo(ref);
});

function PopulateSections(section, headerId, blurbId){
	var sections = new Firebase("https://intense-heat-8777.firebaseio.com/LeaseForm/Sections/" + section);
	
	sections.child("Header").on("value", function(section){
		$('#' + headerId).html(function() {
	    	return $(this).text().replace('[headSection]', section.val());
		});
	});

	sections.child("Blurb").on("value", function(section){
		$('#' + blurbId).html(function() {
	    	return $(this).text().replace('[section]', section.val());
		});
	});
}

function SetTenantInfo(ref){
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
	    		return $(this).text().replace('[secondaryTenant]', ' and ' + secondaryTenant.val());
			}
			else
			{
				return $(this).text().replace('[secondaryTenant]', '');	
			}
		});
		$('#section1Text').html(function() {
			if(secondaryTenant.val() !== null)
			{
	    		return $(this).text().replace('[secondaryTenant]', ' and ' + secondaryTenant.val());
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

}

function SetPropertyInfo(ref){
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
}

function SetDateInfo(ref){
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

	ref.child("DepositDate").on("value", function(depositDate){
		$('#section1Text').html(function() {
	    	return $(this).text().replace('[depositDate]', depositDate.val());
		});
	});

}

function SetAmountInfo(ref){
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

	ref.child("PetDepositAmount").on("value", function(petDeposit){
		$('#section9Text').html(function() {
	    	return $(this).text().replace('[petDeposit]', petDeposit.val());
		});
	});
}