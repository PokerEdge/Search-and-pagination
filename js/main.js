/******************************************************************************************

An outstanding issue is that if a user deletes 'input' text that paginate reads 'list' as a DOM element
	based on the current logic of its conditions to check for that (namely the comparison of length of 
	student-item and length of 'list'). So how can this be reconciled while also checking if the search()
	results yield a match (length is not 0)?

Another problematic use case that fails is that if 'i' is typed twice quickly, "No results message" is 
	shown, along with a few single 'i' results. If the characters are typed slower, then the script 
	functions as intended. Perhaps this is simply a shortcoming of using JavaScript for animations, 
	rather than using CSS3 with newer browsers, and something that cannot be fixed using jQuery?

What are ways in which this code might be made more efficient, cleaner and (for lack of a better way to say),
	more experienced in function and in appearance?

Thank YOU so much for the time you're taking for the detailed review. I appreciated it so very much - Reid	

******************************************************************************************/


//Initialization of some elements of the page on page load 
$(function(){

	//Dynamically insert both the 'input' line and the search button onto the page
	$('.page-header.cf').append("<div class='student-search'><input placeholder='Search for students...'><button>Search</button>");

	//When a key is let up while 'input' is selected, the search function is called
	$('.student-search input').keyup(function(){ search(); });

	//Styled "No search results found" type of message is added to the end of the page
	$('.page').append("<div class='message'>No student elements are being shown.</div>");
	
	//Hide "No search results found" type of message on page load
	$('.message').hide();

});


//Show range of ten student-items on specified page
function paginate(list, page){

	//Defining starting and stopping points for page specific 10 element groups
	var startIndex = page*10-10;
	var endIndex = page*10;

	//Create new page links
   	createLinks(list);

   	//Add active class to 'page' argument of paginate()
	$('.pagination a').eq(page-1).addClass('active');

	//Hide all student elements to ready for conditional to display matched elements, if any match
	$('.student-list').children().hide();

	for(var i = 0; i < list.length; i++){ 
		
		//Condition to sort 10 element group indecies by page given index
		if(i >= startIndex && i < endIndex){

			//Populate 'list' checked against 'list' being a DOM element or not so that paginate() functions
			if(list.length < $('.student-item').length){

				//Animate in matched objects with short time delay
				$('.student-item').eq(list[i]).delay(25*i).fadeIn('fast');

			} else{

				//Animate in matched objects with short time delay
				list.eq(i).delay(25*i).fadeIn('fast');
			}
		}
	}
}


//Create numbered anchor elements depending on number of elements in 'list'
function createLinks(list){

	//Calculate the total number of page elements to be created
    var totalPages = Math.ceil(list.length/10);

    //Get empty elements to construct the new page elements
    var $pageUl = $("<ul></ul>");
    var $listItem = $("<li></li>");
	var $anchorItem;

	//Remove all .pagination and children elements from the page so that new ones will be created separately
	$(".pagination").remove();

	//Begin creation of new page elements
	$(".page").append('<div class = "pagination"></div>');
	$(".pagination").append($pageUl);

	for(var j = 0; j < totalPages; j++){
	
		//Create anchor item with specific page number text based on total number of page elements to be created
		$anchorItem = $('<a href="#">' + (j+1) + '</a>');

		//Bind handler to paginate() on particular anchor element click
		$anchorItem.click(function(){ paginate(list, parseInt($(this).text()));});

		//Append elements to other elements in the page to build a paginated student element 'list'
		$listItem.appendTo($pageUl);
		$anchorItem.appendTo($listItem);
	}
}

//
function search(e){
   
	//Get HTML values with jQuery and store them in variables for manipulation and for search
	var $input = $(".student-search input");
	var $userNames = $(".student-details h3");
 	var $emails = $("span.email");

	//Variable that stores indices that are matched by search function conditions
	var searchResultArray = [];

	//Hide message for when user begins new search after "No results shown" message has been shown
	$('.message').hide();

	for(var i = 0; i < $(".student-item").length; i++){

	    if($userNames.eq(i).text().toLowerCase().indexOf($input.val().toLowerCase()) !== -1 || $emails.eq(i).text().toLowerCase().indexOf($input.val().toLowerCase()) !== -1){
	        
	      	searchResultArray.push(i);

	    }
	}

	//Show "No search results displayed" message if no criteria are matched from 'list'
	if(searchResultArray.length === 0){

		$('.message').show();

	}

    //Call pagination function with arguments that are a 'list' of an array of indices and 'page' of 1
    paginate(searchResultArray, 1);

}

//Run script
paginate($('.student-item'), 1);