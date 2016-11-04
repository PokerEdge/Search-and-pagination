var numShownElements = [];

var searchResultArray = [];

$(function(){

	$(".page-header.cf").append("<div class='student-search'><input placeholder='Search for students...'><button>Search</button>");

	$(".student-search button").click(search);

	// $(".student-search input").keyup(function(){ search(); });

});


function paginate(list, page){

	// Show range of ten items on specified page
	var startIndex = page*10-10;

	var endIndex = page*10;

	// Also have to create new page links, but lets think about that elsewhere
   	createLinks(list);

	$(".pagination a").eq(page-1).addClass("active");

	$('.student-list').children().hide();

	for(var i = 0; i < list.length; i++){ 
			
		console.log(startIndex + " " + endIndex);
		
		if(i >= startIndex && i < endIndex){

			if(list.length < $('.student-item').length){
				$('.student-item').eq(list[i]).show();
			} else{
				list.eq(i).show();
			}
		}
	}

	// return nothing

}


function createLinks(list){
	

	//create properly numbered anchor elements
    var totalPages = Math.ceil(list.length/10);

    var $pageUl = $("<ul></ul>");
    var $listItem = $("<li></li>");
	var $anchorItem;

	$(".pagination").detach();

	$(".page").append('<div class = "pagination"></div>');
	$(".pagination").append($pageUl);

	for(var j = 0; j < totalPages; j++){
	
		$anchorItem = $('<a href="#">' + (j+1) + '</a>');

		//bind click handler to search() on anchor elements, $(this) isn't passing?
			$anchorItem.click(function(){ paginate(list, parseInt($(this).text())); });
		// $anchorItem.click(paginate);

		$listItem.appendTo($pageUl);
		$anchorItem.appendTo($listItem);

	}

    //give class 'active' to page anchor element 1
	$(".pagination a").eq(0).addClass("active");

}


function search(e){
   
	// Get all results that match input from the complete 'list'
	searchResultArray = [];

	var $input = $(".student-search input");

	//Logs the 'input' value to the console
	console.log($input.val());

  	var $userNames = $(".student-details h3");

 	var $emails = $("span.email");
	

	for(var i = 0; i < $(".student-item").length; i++){


	    if($userNames.eq(i).text().toLowerCase().indexOf($input.val().toLowerCase()) !== -1 || $emails.eq(i).text().toLowerCase().indexOf($input.val().toLowerCase()) !== -1){
	        
	        //Not being registered... somehow..., though for loop is passing values correctly
	      	searchResultArray.push($('.student-item').eq(i));
	      	// searchResultArray.push(i);

	    }

	}

	// if(searchResultArray.length === 0){

	// 	console.log("No search results available");

	// }

	console.log("Search result count is " + searchResultArray.length);

    // run the pagination function with the results array and page = 1
    paginate(searchResultArray, 1);

    // return nothing
    	//nothing returned

}

paginate($('.student-item'), 1);