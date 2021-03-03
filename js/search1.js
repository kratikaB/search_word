/*var api = {
  "async": true,
  "crossDomain": true,
  "url": 'https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=',
  "type": 'GET',
  "headers": {
             'x-rapidapi-key': '7f68006ebcmshc12a68700e646c4p12f561jsnb67ac152360f',
             'x-rapidapi-host': 'mashape-community-urban-dictionary.p.rapidapi.com'
            },    
}*/

var fileData = [];
jQuery(document).ready(function () {
  // debugger
  getJsonFileData('https://raw.githubusercontent.com/dwyl/english-words/master/words_dictionary.json');
});

jQuery("#search-box").keyup(function () {
  jQuery("#suggesstion-box").show();
  const searchStr = jQuery(this).val();
  debugger;
   fetch(
`https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=${searchStr}`,
{
  method: "GET",
  headers: {
    "x-rapidapi-host": "mashape-community-urban-dictionary.p.rapidapi.com",
    "x-rapidapi-key": "7f68006ebcmshc12a68700e646c4p12f561jsnb67ac152360f",
  },
})
.then(response => response.json()) // or .text(), or .blob(), etc
.then(result => console.log(result));
  var suggestions = fileData.filter(function (value) {
    return value.toLowerCase().indexOf(searchStr.toLowerCase()) >= 0;
  });
  let returnData = '<ul id="word-list">';
  if (suggestions.length > 0) {
    suggestions.forEach(function (singleWo) {
      returnData += `<li onClick="selectWord('${singleWo}')">${singleWo}</li>`
    });
  } else {
    returnData += `<li onClick="selectWord('Iceland')">No matching results found</li>`
  }
  returnData += '</ul>';
  jQuery("#suggesstion-box").html(returnData);
  jQuery("#search-box").css("background", "#FFF");
});

function selectWord(val) {
  alert(`Selected value is ${val}`);
  jQuery("#search-box").val(val);
  jQuery("#suggesstion-box").hide();
}

  // const RAPIDAPI_API_URL = 'https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=absolutely';
  // const RAPIDAPI_REQUEST_HEADERS = {
  //                 'x-rapidapi-key': '7f68006ebcmshc12a68700e646c4p12f561jsnb67ac152360f',
  //                 'x-rapidapi-host': 'mashape-community-urban-dictionary.p.rapidapi.com'
  //               }
 
async function getJsonFileData(fileUrl) {
  try {

    jQuery.ajax({
      url: fileUrl,
      type: 'GET',
      dataType: 'json',
      success: function (result) {
        fileData = Object.keys(result);
      },
      error: function (error) {
        alert('There is some error while fetching file from server', error);
      }
    });
  }
  catch (error) {
    console.error(error);
  }
}