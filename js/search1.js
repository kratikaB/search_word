var fileData = [];
jQuery(document).ready(function () {
  getJsonFileData('https://raw.githubusercontent.com/dwyl/english-words/master/words_dictionary.json');
});

jQuery("#search-box").keyup(function () {
  jQuery("#suggesstion-box").show();
  const searchStr = jQuery(this).val();
  var suggestions = fileData.filter(function (value) {
    return value.toLowerCase().indexOf(searchStr.toLowerCase()) >= 0;
  });
  let returnData = '<ul id="word-list">';
  if (suggestions.length > 0) {
    suggestions.forEach(function (singleWo) {
      returnData += "<li onClick=\"selectWord('"+singleWo+"')\">"+singleWo+"</li>";
    });
  } else {
    returnData += `<li onClick="selectWord('Iceland')">No matching results found</li>`
  }
  returnData += '</ul>';
  jQuery("#suggesstion-box").html(returnData);
  jQuery("#search-box").css("background", "#FFF");
});

function selectWord(val) {
  alert(`Selected value is` +val);
  jQuery("#search-box").val(val);
  jQuery("#suggesstion-box").hide();
}

async function getJsonFileData(fileUrl) {
  try {
    jQuery.ajax({
      url: fileUrl,
      type: 'GET',
      dataType: 'json',
      success: function (result) {
        // comment below object if you want to your file I added this because your file has much data. 
        // result = {
        //   "Manoj": 1,
        //   "Mahesh": 1,
        //   "Monu": 1,
        //   "Ishu": 1,
        //   "Noney": 1,
        //   "Rinku": 1,
        //   "Rinki": 1,
        //   "Rinka": 1
        // }
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