//search() is called and no results are displayed after paginate(searchResultArray) is returned
	//pagination elements are correctly made after search() is called, but results are not displayed

//on click of any anchor element, including 1, results are displayed properly


var searchResultArray = [];

var numShownElements = [];


$(function(){

	$(".page-header.cf").append("<div class='student-search'><input placeholder='Search for students...'><button>Search</button>");

	$(".student-search button").click(function(){ search(); });

	// $(".student-search input").keyup(function(){ search(); });

});


function paginate(arr, page){


	if (searchResultArray.length === 0){

		for(var a = 0; a < $(".student-list").children().length; a++){
			
			numShownElements.push(a);
		}
		
	}
	else{

		numShownElements = searchResultArray;

	}

	// var displayCount = 0;

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

		
		//ONLY REMAINING ISSUE IS THAT SEARCH RESULTS ARE ALL DISPLAYED IN A SINGLE PAGE - 
			//CLICKING ANCHOR WORKS THOUGH
		$anchorItem.click(showTen);

		$listItem.appendTo($pageUl);
		$anchorItem.appendTo($listItem);

	}


//Does not work for the issue it should solve

	// if (searchResultArray.length < ('student-list').children().length){
		
	// 	displayCount++;

	// 	if(displayCount > 10){

	// 		//need to also hide elements less than i  - this needs to be index filtered to count to 10
	// 		$(".student-list li").eq(numShownElements[i]).hide();
				
	// 	}
	// } else{

	// 	while(displayCount < 10){

	// 		$(".student-list li").eq(numShownElements[i]).show();
	// 		displayCount++;
		
	// 	}
	// }



	$(".pagination a").eq(0).addClass("active");

}

function showTen(){

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

			$('.student-list').children().eq(numShownElements[i]).show();
		}
	}
}


function search(e){

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

	return paginate(searchResultArray, 1); 

}

paginate();