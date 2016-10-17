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

	//Fires
	console.log("Ready!");
});

//Calculate and display the total number of page links given a number of student list elements
function paginate(){

	//
}

//Search and return a string within student list elements and hide or show matching student list elements
function search(){

	//
}