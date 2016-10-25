//CHANGE NAME TO MAIN.JS WITH WORKING CODE - ONLY ISSUE IS PAGINATION OF NEW SEARCH RESULTS

//What is grouping the displayed students into groups of 10? That needs to happen after each search()
	//It's the startIndex and endIndex loop series --> they require some conditional to display search results, if any


var searchResultArray = [];

var numShownElements;


$(function(){

	$(".page-header.cf").append("<div class='student-search'><input placeholder='Search for students...'><button>Search</button>");

	$(".student-search button").click(function(){ search(); });

	$(".student-search input").keyup(function(){ search(); });

});


function init(arr){

	//If numShowElements can be defined w function scope, then there only need be an 'if' condition
	//When no results are found, sra needs to return undefined
	if (searchResultArray.length === 0){

		numShownElements = $(".student-list").children().length;
	
	}
	else{

		numShownElements = searchResultArray.length;

	}

	var lastPageNumber;
	var currentPageNumber = 1;

	var totalPages = Math.ceil(numShownElements/10);

	var $listItem = $("<li></li>");
	var $anchorItem;

	$(".pagination").detach();

	$(".page").append('<div class = "pagination"></div>');
	var $pageUl = $("<ul></ul>");

	for(var j = 0; j < totalPages; j++){
	
		$anchorItem = $('<a href="#">' + (j+1) + '</a>');

		$(".pagination").append($pageUl);
		
		//begin anonymous function that binds click handler and should show(s) 10 elements per page
		$anchorItem.click(function(){

			$(".pagination a").removeClass("active");
			$(this).addClass("active");

			lastPageNumber = currentPageNumber;

			currentPageNumber = parseInt($(this).text());

			var startIndex = currentPageNumber * 10 - 10;

			var endIndex = currentPageNumber * 10;


			for(var i = 0; i < $(".student-list").children().length; i++){
			  
			  $(".student-list li").eq(i).hide();
			  
			  //HOW WILL NEW SEARCH RESULTS BECOME PAGINATED?
			  if(i >= startIndex && i < endIndex && searchResultArray === 0){ // add an and statement here or another 'if' conditional
			  	$(".student-list li").eq(i).show();
			  }

			    else if (i >= startIndex && i < endIndex && searchResultArray[i] !== undefined){//WHAT SHOULD BE SHOWN IS FROM SEARCHRESULTSARRAY && EXISTS
			    	
			    	//Shows all of the student-list li as indexed by the searchResultsArray passed from search()
			    	$(".student-list li").eq(searchResultArray[i]).show();

			    } else{ //no search results displayed

			    	//display "no search results displayed message"
			    	console.log("no search results displayed");
			    }
			}
		}); //end anonymous function


		//THIS PLACEMENT SEEMS TO BE INCORRECT
		$listItem.appendTo($pageUl);
		$anchorItem.appendTo($listItem);

		$(".pagination a").eq(0).addClass("active");

	}

	numShownElements = $(".student-list").children().length;

}


function search(){

	var $input = $(".student-search input");

	console.log($input.val());


  	$userNames = $(".student-details h3");

 	$emails = $("span.email");

 	//searchResultArray reset to prepare for new or continued search (entire value of 'input' is searched)
 	searchResultArray = [];

	for(var i = 0; i < $(".student-list").children().length; i++){

	    $(".student-list li").eq(i).hide();

	    if($userNames.eq(i).text().toLowerCase().indexOf($input.val().toLowerCase()) !== -1 || $emails.eq(i).text().toLowerCase().indexOf($input.val().toLowerCase()) !== -1){

	      $(".student-list li").eq(i).show();

	      searchResultArray.push(i);
  
	    }

	}

	console.log("Search result count is " + searchResultArray.length);
	
	return init(searchResultArray); 

}

init();
