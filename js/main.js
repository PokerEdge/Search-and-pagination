/* 

Use the filters-example.html file to guide your decision making. Using progressive enhancement, your work 
should affect the index.html file.

Since only 10 students should be shown at a time, your programming needs to calculate the number of pages needed 
and add the appropriate number of links to the bottom of the page.

Hide all but the first 10 students when the page loads.

When a user clicks on “2” in the pagination, students 11 through 20 are shown. When a user clicks “3”, 
students 21 through 30 are shown. And so on. When “6” is clicked 51 through 55 should be shown.

Using progressive enhancement, add the student search markup as presented in the filters-example.html file to 
the index.html file.

Add an event listener to the search button. When the user clicks on the button it should use the text 
in the search input to filter the results. Searching should be case insensitive. e.g. a search for “Susan” should 
return results for “susan” and “Susan".

Users should be able to search by name or e-mail address. And partial matches, like just a first name, should be 
displayed in the results.

Search results should also be paginated. For example, if the search returns more than 10 results, 
those results should be paginated too. You will need to be accomplish this without the use of jQuery or other 
library plugins.

*/

//NEEDS TO BE SET EACH TIME SEARCH IS PERFORMED
var searchResultArray = [];

var numShownElements;


//On ready, dynamically add 'input' element and search 'button' at the proper places within the HTML index
$(function(){

	//
	$(".page-header.cf").append("<div class='student-search'><input placeholder='Search for students...'><button>Search</button>");

	//On click of search button, search() returns the searchResultArray that has been populated with results
	//based on user text input within 'input' text field at the time of the user's click
	$(".student-search button").click(function(){ search(); });

});


//Calculate and display the total number of page links given a number of student list elements
function init(arr){

	if (searchResultArray.length === 0){

		numShownElements = $(".student-list").children().length;
	
	}
	else{

		numShownElements = searchResultArray.length;

	}

//MAKE INTO GLOBAL VARIABLES SO THAT THEY WORK IN BOTH INITIALIZE AND PAGINATE?
	var lastPageNumber;
	var currentPageNumber = 1;

	//Get LIST of of SHOWING student list elements and assign it to a variable - this will be array.length
	var shownElements; // = ?????

	//Calculate total number of page elements given number (length) of student list elements (that meet search criteria)
	var totalPages = Math.ceil(numShownElements/10);

	var $listItem = $("<li></li>");
	var $anchorItem;

	$(".pagination").detach();

	//Dynamically append "pagination" class unordered list to "page" element
	$(".page").append('<div class = "pagination"></div>');
	var $pageUl = $("<ul></ul>");

	for(var j = 0; j < totalPages; j++){
	
		//Dynamically insert a numbered anchor item for each list item
		$anchorItem = $('<a href="#">' + (j+1) + '</a>');

		$(".pagination").append($pageUl);
		
		//Bind click handler to each page anchor element
		//DOES THIS NEED TO POINT TO AN ANONYMOUS FUNCTION OR CAN IT SIMPLY CALL PAGINATE? WHAT ABOUT ANIAMTIONS?
		$anchorItem.click(function(){

			//Outstanding issue is the management of lastPageNumber and currentPageNumber variable scope. 
				//Need to be global?

			//On click, use anonymous function anchor elements have class "active" added to 
			//$this or removed from other anchors
			$(".pagination a").removeClass("active");
			$(this).addClass("active");

			//***************************************************************************

			//Set page number for new click
			lastPageNumber = currentPageNumber;

			//Get text from href to show which set of 10 or fewer student-list elements to display
			var currentPageNumber = parseInt($(this).text());

			//Show appropriate student-list list elements using currentPageNumber index the elements
			var startIndex = currentPageNumber * 10 - 10;

			//Set new endIndex based on the clicked pagination anchor element
			var endIndex = currentPageNumber * 10;

			//Hide all list elements
			for(var i = 0; i < $(".student-list").children().length; i++){
			  $(".student-list li").eq(i).hide();
			      
			  //Find student-list elements matching with clicked pagination anchor element
			  //REPLACE STUDENT LIST LI WITH THE RETURNED ARRAY
			  if(i >= startIndex && i < endIndex){
			    $(".student-list li").eq(i).show();
			  }
			}

			//***************************************************************************

		});

		//Add list items and anchors within the unordered list at the bottom of the .page div
		$listItem.appendTo($pageUl);
		$anchorItem.appendTo($listItem);

		$(".pagination a").eq(0).addClass("active");

	}

	//Reset numShownElements for next post-search init() call
	numShownElements = $(".student-list").children().length;

}

//Displays n number of student-list elements per page element (for this project, n = 10)
//Elements come from search() results and are elements stored within the searchResultsArray
function paginate(arrayElementsFromSearch){
	
	var n = 10;


	console.log(search());

	console.log(searchResultArray.length);
	//returned array.length creates new indecies for what is NOW in the init() function

	//init();



	// for(var i = 0; i < $(".student-list").children().length; i++){
	// 		  $(".student-list li").eq(i).hide();
	// }

	// for(var j = 0; j < testArray.length; j++){

	// 	// $(".student-list li").eq(testArray[j]).show();

	// }
	//INSERT CODE FROM ANONYMOUS FUNCTION WITHIN INITIALIZE() SO THAT PAGINATE WORKS TO INITILIALIZE AND TO 
	//UPDATE PAGINATION ANCHOR ELEMENTS

	//The arguments object contains an array of the arguments used when the function was called (invoked).

    //This way you can simply use a function to find (for instance) the highest value in a list of numbers:

}

//Search and return a string within student list elements and hide or show matching student list elements
function search(){

	//Check to see if string within input element matches text within student list elements
		//Select "input" element
	var $input = $(".student-search input");
		//Get "input" text to check with conditional vs student element text using indexOf()
	console.log($input.val());

	//Get user names
  	$userNames = $(".student-details h3");

  	//Get emails
 	$emails = $("span.email");
		//Loop through and hide all student list elements
		//Loop with if statement: if student list element matches, or if does not match, show element
		//return list of shown elements as a varaible to use in paginate() and in displayElements()

//Stores indices of all elements for which user searches
	searchResultArray = [];

	//Perform search functionality

	for(var i = 0; i < $(".student-list").children().length; i++){

	    $(".student-list li").eq(i).hide();

	    //Search for matches to entered (sub)string within the "input" element when search button is clicked
	    if($userNames.eq(i).text().toLowerCase().indexOf($input.val().toLowerCase()) !== -1 || $emails.eq(i).text().toLowerCase().indexOf($input.val().toLowerCase()) !== -1){

	      //If non-case sensitive 'input' text matches .student-list element text, then results are shown
	      $(".student-list li").eq(i).show();
	          
	      //***** searchResultCount is new studentListSize to be used in new pagination function call
	      //Don't need the entire element, we just need a list of indices... also an array, but the length and the 
	      	//elements are already sub-parts of student-list, so restoring the values seems superfluous
	      	//Maybe use if that index filled variable is < student-list then perform paginate with
	      		//index filled virable's elements, else if === 0 display message, else intialize the page
	      
	      //Should populate array with indices to be used to paginate() search results
	      // searchResultArray.push($(".student-list li").eq(i));
	      searchResultArray.push(i);

	      
	    }
	    // else(){$(NON SEARCH INDEXED ELEMENTS).slideUp();}

	}

	//Call paginate with argument of new list size based on number, or indices?, of search results

	// console.log("Search result count is " + searchResultArray);
	// return paginate(searchResultArray);

	//paginate();

	//Should return undefined if there are no search results, since it starts with length of 0 - SO MESSAGE CAN BE CHECKED
	return init(searchResultArray); 

}

/*** SHOW MESSAGE EXTRA CREDIT PART ***/
//Hide and show search() function returned list of elements that are paginated
function noResultsMessage(){

	//remove message HTML from .page element at beginning of function
	//If search returns array with length 0, then insert HTML for message into the app appended to .page
	//Hide all student list elements
	//Show curated student list elements, those that correspond to search()



	//paginate() the curated student list elements
}

init();

//search('keyup', paginate(searchResultArray));

//syntax may be incorrect to call paginate after search function is called on 
	//keyup event on input element




/*** ANIMATION EXAMPLE ***/

// $( "p" ).click(function() {
//   $( this ).slideUp();
// });