
var searchResultArray = [];

var numShownElements;

var startIndex;

var endIndex;


$(function(){


	$(".page-header.cf").append("<div class='student-search'><input placeholder='Search for students...'><button>Search</button>");

	$(".student-search button").click(function(){ search(); });

	$(".student-search input").keyup(function(){ search(); });

});


function init(arr){

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
		
		$anchorItem.click(function(){

			$(".pagination a").removeClass("active");
			$(this).addClass("active");


			lastPageNumber = currentPageNumber;

			currentPageNumber = parseInt($(this).text());

			startIndex = currentPageNumber * 10 - 10;

			endIndex = currentPageNumber * 10;

			for(var i = 0; i < $(".student-list").children().length; i++){
			  $(".student-list li").eq(i).hide();

			  if(i >= startIndex && i < endIndex){

			  	$(".student-list li").eq(i).show();
			  }
			}

		});

		$listItem.appendTo($pageUl);
		$anchorItem.appendTo($listItem);

		$(".pagination a").eq(0).addClass("active");

	}


	numShownElements = $(".student-list").children().length;

}


function search(){

	var $input = $(".student-search input");

  	$userNames = $(".student-details h3");

 	$emails = $("span.email");

 	searchResultArray = [];

	for(var i = 0; i < $(".student-list").children().length; i++){

	    $(".student-list li").eq(i).hide();

	    if($userNames.eq(i).text().toLowerCase().indexOf($input.val().toLowerCase()) !== -1 || $emails.eq(i).text().toLowerCase().indexOf($input.val().toLowerCase()) !== -1){

	      if(i >= startIndex && i < endIndex){

			  	$(".student-list li").eq(i).show();
			  }
	        
	        
	      searchResultArray.push(i);

	    }

	}


	console.log("Search result count is " + searchResultArray.length);

	return init(searchResultArray); 
}

init();

