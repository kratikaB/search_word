var fileData = [];
jQuery(document).ready(function () {
  // debugger
  getJsonFileData('https://raw.githubusercontent.com/dwyl/english-words/master/words_dictionary.json');
});

$("#search-box").keyup(function () {
  $("#suggesstion-box").show();
  const searchStr = $(this).val();
  var suggestions = fileData.filter(function (value) {
    return value.toLowerCase().indexOf(searchStr.toLowerCase()) >= 0;
  });
  let returnData = '<ul id="word-list">';
  if (suggestions.length > 0) {
    suggestions.forEach(function (singleWo) {
      returnData += `<li onClick="selectWord('${singleWo}')">${singleWo}</li>`
    });
  } else {
    returnData += `<li onClick="selectWord('No matching results found')">No matching results found</li>`
  }
  returnData += '</ul>';
  $("#suggesstion-box").html(returnData);
  $("#search-box").css("background", "#FFF");
});

function selectWord(val) {
  alert(`Selected value is ${val}`);
  jQuery("#search-box").val(val);
  jQuery("#suggesstion-box").hide();
  jQuery.ajax({
    url: `https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=${val}`,
    type: 'GET',
    headers: {
      "x-rapidapi-host": "mashape-community-urban-dictionary.p.rapidapi.com",
      "x-rapidapi-key": "7f68006ebcmshc12a68700e646c4p12f561jsnb67ac152360f",
    },
    dataType: 'json',
    success: function (result) {
      let returnDefinationData = '<div id="definition-list">';
      if (result.list.length > 0) {
        result.list.forEach(function (singleObj) {
          returnDefinationData += `<p">${singleObj.definition}</p>`
        });
      } else {
        returnDefinationData += `<p">No definition found</p>`
      }
      returnDefinationData += '</div>';
      $("#definition-box").html(returnDefinationData);
    },
    error: function (error) {
      alert('There is some error while fetching file from server', error);
    }
  });
}

async function getJsonFileData(fileUrl) {
  try {

    jQuery.ajax({
      url: fileUrl,
      type: 'GET',
      dataType: 'json',
      success: function (result) {
        result = {
          "Manoj": 1,
          "praveen": 1,
          "aayushi": 1,
          "Ishu": 1,
          "Noney": 1,
          "pradeep": 1,
          "rahul": 1,
          "aman": 1
        }
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