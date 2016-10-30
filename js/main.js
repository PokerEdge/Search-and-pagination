var searchResultArray = [];

var numShownElements = [];

// var startIndex;

// var endIndex;


$(function(){

	$(".page-header.cf").append("<div class='student-search'><input placeholder='Search for students...'><button>Search</button>");

	$(".student-search button").click(function(){ search(); });

	// $(".student-search input").keyup(function(){ search(); });

});


function init(arr){

	if (searchResultArray.length === 0){

		//EDIT SO THAT BOTH POSSIBILITIES OF numShownElements ARE ARRAYS POPULATED WITH INDEX NUMBERS
		for(var a = 0; a < $(".student-list").children().length; a++){
			
			numShownElements.push(a);
		}
		
	}
	else{

		numShownElements = searchResultArray;

	}

	var initCount = 0;

	var lastPageNumber;
	var currentPageNumber = 1;

	var totalPages = Math.ceil(numShownElements.length/10);

	var $listItem = $("<li></li>");
	var $anchorItem;

	$(".pagination").detach();

	$(".page").append('<div class = "pagination"></div>');
	var $pageUl = $("<ul></ul>");

	for(var j = 0; j < totalPages; j++){
	
		$anchorItem = $('<a href="#">' + (j+1) + '</a>');

		$(".pagination").append($pageUl);

		$anchorItem.click(showTen);

		$listItem.appendTo($pageUl);
		$anchorItem.appendTo($listItem);

	}

		//ONLY REMAINING ISSUE IS THAT SEARCH RESULTS ARE ALL DISPLAYED IN A SINGLE PAGE - 
			//CLICKING ANCHOR WORKS THOUGH
			//NEED FUNCTION TO INIT FIRST 10 (SEARCH) ELEMENTS OR CODE FOR IT HERE?
					

		//Displaying first 10 elements should not be within the for loop

			// $('.student-list').children().eq(numShownElements[i]).show();
			// initCount++;

			// if(initCount > 10){

			// 	//ISSUE HERE? on init after search, isn't displaying search results, does on click of 1 though
			// 	$(".student-list li").eq(numShownElements[i]).hide();
				
			// }

	$(".pagination a").eq(0).addClass("active");
}




function showTen(){

	var displayCount = 0;

	var currentPageNumber = parseInt($(this).text());

	var lastPageNumber = currentPageNumber;

	var startIndex = currentPageNumber*10-10;

	var endIndex = currentPageNumber*10;

	$(".pagination a").removeClass("active");
			
	$(this).addClass("active");

	$('.student-list').children().hide();

	for(var i = 0; i < numShownElements.length; i++){
			
		console.log(startIndex + " " + endIndex);
		if(i >= startIndex && i < endIndex){

			console.log(numShownElements[i]);

			//ISSUE IS HERE
			$('.student-list').children().eq(numShownElements[i]).show();
			displayCount++;

			if(displayCount > 10){

				//ISSUE HERE? on init after search, isn't displaying search results, does on click of 1 though
				$(".student-list li").eq(numShownElements[i]).hide();
				
			}
		}
	}
}


function search(){

	//Issue going from selected page '$(this)' to search() results, e.g. user clicks page 3 then searches
		//Post search() function call, not all items are being hidden? Too many are being shown?

	searchResultArray = [];

	var $input = $(".student-search input");

	//Logs the 'input' value to the console
	console.log($input.val());

  	$userNames = $(".student-details h3");

 	$emails = $("span.email");
	

	for(var i = 0; i < $(".student-list").children().length; i++){

	    if($userNames.eq(i).text().toLowerCase().indexOf($input.val().toLowerCase()) !== -1 || $emails.eq(i).text().toLowerCase().indexOf($input.val().toLowerCase()) !== -1){

			//SOMETHING IS INCORRECT HERE BECAUSE AFTER SEARCH DISPLAYS FIRST 14 ELEMENTS
			// $(".student-list li").eq(i).show();
	        
	      	searchResultArray.push(i);

	    }

	}

	console.log("Search result count is " + searchResultArray.length);

	return init(searchResultArray);

}

init();