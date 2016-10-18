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

//On ready, dynamically add input element and search button at the proper place(s) in the HTML index
$(function(){

	//
	$(".page-header.cf").append("<div class='student-search'><input placeholder='Search for students...'><button>Search</button>");

	//
	$(".student-search button").click(function(){ search(); });

});

//Calculate and display the total number of page links given a number of student list elements
function paginate(){

	//Good for intialization, but what about search refined list element sizes? maybe 
	//**** if input.val().length === 0, else search(), which redefines numShownElements based on input text

	var numShownElements = $(".student-list").children().length;

	var lastPageNumber;
	var currentPageNumber = 1;

	//Find number of showing student list elements and assign it to a variable
	var shownElements; // = ?????

	//Calculate total number of page elements given number (length) of student list elements (that meet search criteria)
	var totalPages = Math.ceil(numShownElements/10);

	var $listItem = $("<li></li>")
	var $anchorItem;

	//$(".pagination").detach();

	//Dynamically append "pagination" class unordered list to "page" element
	$(".page").append('<div class = "pagination"></div>');
	var $pageUl = $("<ul></ul>");

	for(var j = 0; j < totalPages; j++){
	
		//Dynamically insert a numbered anchor item for each list item
		$anchorItem = $('<a href="#">' + (j+1) + '</a>');

		$(".pagination").append($pageUl);
		
		//Bind click handler to each page anchor element
		//Create function displayElements() and pass it the value "$this" ?
		$anchorItem.click(function(){

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
}

//Search and return a string within student list elements and hide or show matching student list elements
function search(){

	//Check to see if string within input element matches text within student list elements
		//Select "input" element
	var $input = $(".student-search input");
		//Get "input" text
	console.log($input.val());
		//Loop through and hide all student list elements
		//Loop with if statement: if student list element matches, or if does not match, show element
		//return list of shown elements as a varaible to use in paginate() and in displayElements()


		//Call paginate with argument of new list size based on number, or indices?, of search results

	//return curratedList comprised of i elements, a variable that can be used to paginate and to display 
	//matching shown elements

}

//Hide and show search() function returned list of elements that are paginated
function displayElements(){

	//Hide all student list elements
	//Show curated student list elements, those that correspond to search()



	//paginate() the curated student list elements
}

paginate();