// ==UserScript==
// @name         Eka's Chat Mint
// @namespace    http://tampermonkey.net/
// @homepage     https://z0r.de/7432
// @version      0.1.60
// @icon         https://rp.aryion.com/img/profile/184938_f0842d7490194c2b9574ba049f3dda06.png
// @description  Alpha version "Melting-mint-choc" (mods in new things)
// @author       Jobix
// @match        https://rp.aryion.com/*
// @grant        GM_addStyle
// @grant        GM_registerMenuCommand
// @run-at       document-start
// @updateURL    https://mojojohoe.github.io/EkaScripts/mint-TamperMonkey.js
// @downloadURL   https://mojojohoe.github.io/EkaScripts/mint-TamperMonkey.js
// ==/UserScript==

(function() {
  "use strict";
/*╔════════════════════════════════════════════════════════════════════════════════════════════════*\
░ ║ If Anywhere 
\*╚════════════════════════════════════════════════════════════════════════════════════════════════*/
      // Function to store settings in local storage
      function mint_localStore(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    // Function to load settings from local storage
    function mint_localLoad(key) {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    }
    
    var clockVisibility = mint_localLoad("mint_settingTheme-Time");
    var themeVisibility = mint_localLoad("mint_settingTheme-Chat");
    var statusVisibility = mint_localLoad("mint_settingTheme-Statuses");
    var fontVisibility = mint_localLoad("mint_settingTheme-Font");

GM_addStyle(`
    #mint_config-menu {
background-color: #222222;
color: #9bdec0;
padding: 10px;
transform: translate(-50%, -50%);
width: calc(90% - 200px);
height: 90%;
position: absolute;
z-index: 9999;
top: 50%;
left: 50%;
border-radius: 20px;
border: 2px inset #0c1a14;
display:none;
flex-direction: row;
flex-wrap: wrap;
}
.settingsContent{
height: calc(100% - 20%);
overflow-y:scroll;
width:100%;
display: flex;
flex-wrap: wrap;
}
.styleOptions {
width: 25%;
border-right: 1px solid #80b996;
}
#mint_config-menu h2 {
width: 100%;
display: inline;
font-size:24px
}

#mint_config-menu details {
text-align: left;
}

#mint_config-menu .styleOptions div {
width: 250px;
height: 30px;
}

#mint_config-menu .styleOptions div span {
float: right;
}

#mint_config-menu .styleOptions summary {
margin-bottom: 25px;
}
#mint_config-menu h1{
width:100%;
height:30px;
margin:2%;
font-size:30px;
}
#mint_config-menu details{
margin: 20px 30px;
}
#mint_config-menu.styleOptions{
width:33%;
}
#mint_config-menu.styleOptions{
min-width:60%;
width:auto;
}
#mint_config-menu .behaviorDropdown,
#mint_config-menu button,
#mint_config-menu input,
#mint_config-menu select {
height: 25px;
background-color: #333;
color: #69dba8;
border: 1px solid #555;
border-radius: 5px;
}
.removeBtn{
color:#db7169 !important;
}
#mint_config-menu input[type="checkbox"] {
position: relative;
width: 40px;
height: 20px;
-webkit-appearance: none;
background: #ff7066;
outline: none;
border-radius: 10px;
box-shadow: inset 0 0 5px rgba(255, 0, 0, 0.2);
transition: 0.2s;
}

#mint_config-menu input:checked[type="checkbox"] {
background: #66ff96;
}

#mint_config-menu input[type="checkbox"]:before {
content: '';
position: absolute;
width: 20px;
height: 20px;
border-radius: 10px;
top: 0;
left: 0;
background: #ffffff;
transform: scale(1.1);
box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
transition: .5s;
}

#mint_config-menu input:checked[type="checkbox"]:before {
left: 20px;
}

.pickerContainer {
display: none;
position: absolute;
z-index: 99999;
}

.emoji-button {
font-size: 1.5rem;
line-height: 0px;
vertical-align: middle;
background: transparent;
border: none;
border: 1px solid #303030;
padding: 0px;
border-radius: 5px;
cursor: pointer;
width: 3rem;
height: 30px !important;
vertical-align: center;
display: inline;
font-family: 'Segoe UI Emoji', 'Segoe UI Symbol', 'Segoe UI', 'Apple Color Emoji', 'Twemoji Mozilla', 'Noto Color Emoji', 'EmojiOne Color', 'Android Emoji';
color: #fff;
}
#filterBox .styleOptions summary {
display: flex;
}
#filterTemplate {
display: none;
}
#emojiContainer {
position: relative;
}
em-emoji-picker {
    height: 40vh;
    min-height: 300px;
    max-height: 40vh;
}
#emojiMart{
display:none;
}
#showEmoji.active +#emojiMart {
display: inline;
}
#showEmoji.active {
outline: 1px solid white;
}
input:-internal-autofill-selected {
background-color: rgb(26, 31, 29) !important;
color: #69dba8 !important;
}
#root{
height:100%;
}
#mint_config-close{
position: absolute;
font-size: 40px;
right:10px;
top:0px;
cursor: pointer;
transition: 0.5s all;
}
#mint_config-close:hover{
transform: scale(1.2);
color:white;
}
`);
var link = document.querySelector("link[rel~='icon']");
if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
}
link.href = 'https://rp.aryion.com/img/profile/184938_f0842d7490194c2b9574ba049f3dda06.png';

document.addEventListener("DOMContentLoaded", function() {
const mintConfigMenu = document.createElement('div');
mintConfigMenu.innerHTML = `
<div id="mint_config-menu">
<div id="mint_config-close">×</div>
<h1>Mint Settings</h1>
<div class="settingsContent">
<details class="styleOptions" open>
<summary><h2>Styling Options</h2></summary>
<div>Hide Timestamp  <span><input id="mint_toggleTime" type="checkbox" data="mint_clock-hide" checked="true"/></div>
<div>Enable Font<span><input id="mint_toggleFont" type="checkbox" data="mint_font" checked="true"/></div>
<div>Enable Chat Theme<span><input id="mint_toggleChat" type="checkbox" data="mint_theme" checked="true"/></div>
<div>Enable Mint Statuses<span><input id="mint_toggleStatuses" type="checkbox" data="mint_statuses" checked="true"/></div>
<br><br>
</span>
</details>
<details class="charFilters" open>
<details id="filterTemplate" open>
<summary><span class="icon">👑</span><span class="name">Example Name</span>
<button class="removeBtn">Remove</button>
| Behaviour:
<select class="behaviorDropdown" prop="behave">
<option value="0">Nothing</option>
<option value="1">Dull Name</option>
<option value="2">Ping on Entering Room</option>
<option value="3">Highlight Messages</option>
<option value="4">Ignore Messages</option>
</select>
<select class="andDropdown" prop="case">
<option value="0">and</option>
<option value="1">if</option>
<option value="2">if not</option>
</select>
<select class="behaviorDropdown2" prop="behave2">
<option value="0">Nothing</option>
<option value="1">Dull Name</option>
<option value="2">Ping</option>
<option value="3">Highlight Messages</option>
<option value="4">Ignore Messages</option>
</select>
<select class="caseDropdown" prop="trigger">#
<option value="0">Nothing</option>
<option value="1">Status is Online</option>
<option value="2">Status is LFRP</option>
<option value="3">Enters the Room</option>
</select>
</summary>
<input type="text" class="newCharName" placeholder="Add Character Name">
<button class="addNewCharBtn">Add New</button>
<div class="charNameContainer"></div>
</details>

<summary><h2>Character Filters</h2></summary>
<span id="emojiContainer">
<button id="showEmoji" type="button" class="emoji-button">
👑
</button>
<div class="pickerContainer" id="emojiMart"></div>
</span>
<input type="text" id="newCategoryName" placeholder="Category Name">

<button id="addNewBtn">Add New</button>
<div id="filterBox">

</div>
<br><br>
</span>
</details>
</div>
</div>
`;
document.body.appendChild(mintConfigMenu);

if (typeof GM_registerMenuCommand !== "undefined") {
  GM_registerMenuCommand('Configuration', function() {
      document.getElementById('mint_config-menu').style.display = 'flex';
  });
}
});

/*╔------------------------------------------------------------------------------------------------*\
░ ║ Emoji support because we were young and reckless and decide to use it in the config menu
\*╚------------------------------------------------------------------------------------------------*/

let emojiSupport = document.createElement("script");
emojiSupport.type = "text/javascript";
emojiSupport.src =
  "https://cdnjs.cloudflare.com/ajax/libs/emoji-js/3.8.0/emoji.min.js";
document.head.appendChild(emojiSupport);

let pickerSupport = document.createElement("script");
pickerSupport.type = "text/javascript";
pickerSupport.src =
  "https://cdn.jsdelivr.net/npm/emoji-mart@latest/dist/browser.js";
document.head.appendChild(pickerSupport);

/*╔------------------------------------------------------------------------------------------------*\
░ ║ Load the config menu components after page load
\*╚------------------------------------------------------------------------------------------------*/
window.onload = function(){
    
      document.getElementById("mint_toggleTime").addEventListener("change", function() {
        clockVisibility = clockVisibility === 1 ? 0 : 1;
          mint_toggleTheme_Time(clockVisibility);
      });
    
      document.getElementById("mint_toggleFont").addEventListener("change", function() {
        fontVisibility = fontVisibility === 1 ? 0 : 1;
          mint_toggleTheme_Font(fontVisibility);
      });
    
      document.getElementById("mint_toggleChat").addEventListener("change", function() {
        themeVisibility = themeVisibility === 1 ? 0 : 1;
          mint_toggleTheme_Chat(themeVisibility);
      });
    
      document.getElementById("mint_toggleStatuses").addEventListener("change", function() {
        statusVisibility = statusVisibility === 1 ? 0 : 1;
          mint_toggleTheme_Statuses(statusVisibility);
      });
    
      
      var mint_filters = []
    
      var templateEntry = document.querySelector('.template');
    
     const pickerOptions = {
          onEmojiSelect: (emoji) => {
              const showEmojiElement = document.getElementById("showEmoji");
              if (showEmojiElement) {
                  showEmojiElement.innerHTML = emoji.native;
              }
          }
      };
      const picker = new EmojiMart.Picker(pickerOptions);
      document.getElementById('emojiMart').appendChild(picker);
    
    
      document.getElementById('addNewBtn').addEventListener('click', function() {
          var newCategoryNameInput = document.getElementById('newCategoryName');
          var newCategoryName = newCategoryNameInput.value.trim();
          var selectedIcon = document.getElementById('showEmoji').textContent; // Use the icon from the showEmoji button
    
          if (newCategoryName !== '') {
              // Clone the template entry (you need to adjust this part based on your structure)
              var templateEntry = document.getElementById('filterTemplate').cloneNode(true);
    
              // Set new IDs for the cloned elements
              var filterIndex = mint_filters.length;
              templateEntry.id = 'mint_filter-' + filterIndex;
              templateEntry.querySelector('.removeBtn').id = 'removeBtn-' + filterIndex;
              templateEntry.querySelector('.behaviorDropdown').id = 'behaviorDropdown-' + filterIndex;
              templateEntry.querySelector('.caseDropdown').id = 'caseDropdown-' + filterIndex;
              templateEntry.querySelector('.behaviorDropdown2').id = 'behaviorDropdown2-' + filterIndex;
              templateEntry.querySelector('.andDropdown').id = 'andDropdown-' + filterIndex;
              templateEntry.querySelector('.addNewCharBtn').id = 'addNewCharBtn-' + filterIndex;
              // Set the filter icon
              var iconSpan = templateEntry.querySelector('.icon');
              iconSpan.textContent = selectedIcon;
    
              // Set the filter name
              var nameSpan = templateEntry.querySelector('.name');
              nameSpan.textContent = newCategoryName;
    
              // Append the cloned template to the filterBox container
              document.getElementById('filterBox').appendChild(templateEntry);
              document.getElementById('caseDropdown-' + filterIndex).style.display = "none";
              // Add the new filter to the mint_filters array
              var newFilter = {
                  name: newCategoryName,
                  icon: selectedIcon,
                  behave: 0,
                  case: 0,
                  behave2: 0,
                  trigger: 0
              };
              mint_filters.push(newFilter);
    
              // Store the updated mint_filters array in local storage
              mint_localStore('mint_filters', JSON.stringify(mint_filters));
    
              // Clear the input field
              newCategoryNameInput.value = '';
          }
      });
    
      document.getElementById('filterBox').addEventListener('click', function(event) {
          var removeBtn = event.target.closest('.removeBtn');
          if (removeBtn) {
              var detailsElement = removeBtn.closest('details');
              var filterId = detailsElement.id;
              var filterIndex = mint_filters.findIndex(filter => filterId === 'mint_filter-' + mint_filters.indexOf(filter));
    
              if (filterIndex !== -1) {
                  // Ask for confirmation before removing the filter
                  var confirmation = confirm(
                      "Are you sure you wish to remove " + mint_filters[filterIndex].name +
                      "? All associated behavior applied to the listed character names will be lost forever."
                  );
    
                  if (confirmation) {
                      // Remove the filter if the user confirms
                      mint_filters.splice(filterIndex, 1);
                      mint_localStore('mint_filters', JSON.stringify(mint_filters));
                      detailsElement.remove();
    
                      // Update IDs and names of remaining filters
                      updateFilterIdsAndNames();
                  }
              }
          }
      });
    
      // Function to update IDs and names of remaining filters after a filter is removed
      function updateFilterIdsAndNames() {
          var filterElements = document.querySelectorAll('#filterBox details');
    
          filterElements.forEach(function(filterElement, index) {
              var newFilterId = 'mint_filter-' + index;
              var newRemoveBtnId = 'removeBtn-' + index;
              var newBehaviorDropdownId = 'behaviorDropdown-' + index;
              var newCaseDropdownId = 'caseDropdown-' + index;
              var newBehaviorDropdown2Id = 'behaviorDropdown2-' + index;
              var newAndDropdownId = 'andDropdown-' + index;
              var addNewCharBtnId = 'ddNewCharBtn-' + index;
              var newCharNameId = 'newCharName-' + index;
    
              // Update IDs
              filterElement.id = newFilterId;
              filterElement.querySelector('.removeBtn').id = newRemoveBtnId;
              filterElement.querySelector('.behaviorDropdown').id = newBehaviorDropdownId;
              filterElement.querySelector('.caseDropdown').id = newCaseDropdownId;
              filterElement.querySelector('.behaviorDropdown2').id = newBehaviorDropdown2Id;
              filterElement.querySelector('.andDropdown').id = newAndDropdownId;
              filterElement.querySelector('.addNewCharBtn').id = addNewCharBtnId;
              filterElement.querySelector('.newCharName').id = newAndDropdownId;
    
          })
      }
      document.getElementById('filterBox').addEventListener('click', function(event) {
          var addNewCharBtn = event.target.closest('.addNewCharBtn');
          if (addNewCharBtn) {
              var filterDetails = addNewCharBtn.closest('details');
              var filterIndex = parseInt(filterDetails.id.split('-')[1], 10);
    
              var newCharNameInput = filterDetails.querySelector('.newCharName');
              var charNameValue = newCharNameInput.value.trim();
    
              // Check if the newCharName field is not empty
              if (charNameValue !== '') {
                  // Check if the name already exists in mint_filters[indexValue].names
                  if (mint_filters[filterIndex].names && mint_filters[filterIndex].names.includes(charNameValue)) {
                      alert("Character name already present in this filter");
                  } else {
                      // Add the name to mint_filters[indexValue].names
                      mint_filters[filterIndex].names = mint_filters[filterIndex].names || [];
                      mint_filters[filterIndex].names.push(charNameValue);
    
                      // Create entry to append to charNameContainer
                      var charNameContainer = filterDetails.querySelector('.charNameContainer');
                      var newCharEntry = document.createElement('div');
                      newCharEntry.className = charNameValue;
                      newCharEntry.innerHTML = '<a href="../../profile/' + charNameValue + '" target="_blank">' + charNameValue + '</a><button class="deleteCharEntry">×</button>';
    
                      charNameContainer.insertBefore(newCharEntry, charNameContainer.firstChild);
    
                      // Clear the newCharName field
                      newCharNameInput.value = '';
    
                      mint_localStore('mint_filters', JSON.stringify(mint_filters));
                  }
              }
          }
      });
      document.getElementById('filterBox').addEventListener('click', function(event) {
          var deleteCharEntryBtn = event.target.closest('.deleteCharEntry');
          if (deleteCharEntryBtn) {
              var charEntry = deleteCharEntryBtn.closest('div');
              var charNameValue = charEntry.classList[0]; // Assuming the first class is the character name
    
              // Remove the character name from mint_filters[indexValue].names
              var filterDetails = charEntry.closest('details');
              var filterIndex = parseInt(filterDetails.id.split('-')[1], 10);
              var nameIndex = mint_filters[filterIndex].names.indexOf(charNameValue);
              if (nameIndex !== -1) {
                  mint_filters[filterIndex].names.splice(nameIndex, 1);
                  mint_localStore('mint_filters', JSON.stringify(mint_filters));
              }
              // Remove the character entry from charNameContainer
              charEntry.remove();
              mint_localStore('mint_filters', JSON.stringify(mint_filters));
    
          }
      });
      document.getElementById('filterBox').addEventListener('change', function(event) {
          var target = event.target;
          var filterIndex = parseInt(target.id.split('-')[1], 10);
          // Check if the change event is triggered on a behaviorDropdown
          if (target.classList.contains('behaviorDropdown')) {
              // Get the filter index from the behaviorDropdown id
              filterIndex = parseInt(target.id.split('-')[1], 10);
    
              // Update the behave property in mint_filters array
              mint_filters[filterIndex].behave = parseInt(target.value, 10);
          }
          if (target.classList.contains('andDropdown')) {
              // Get the filter index from the behaviorDropdown id
              filterIndex = parseInt(target.id.split('-')[1], 10);
    
              // Update the behave property in mint_filters array
              mint_filters[filterIndex].case = parseInt(target.value, 10);
              if (parseInt(target.value, 10) === 0) {
                  mint_filters[filterIndex].trigger = 0;
                  document.getElementById('caseDropdown-' + filterIndex).selectedIndex = 0;
                  document.getElementById('caseDropdown-' + filterIndex).style.display = "none";
                  document.getElementById('behaviorDropdown2-' + filterIndex).style.display = "inline";
              } else {
                  mint_filters[filterIndex].behave2 = 0;
                  document.getElementById('behaviorDropdown2-' + filterIndex).selectedIndex = 0;
                  document.getElementById('behaviorDropdown2-' + filterIndex).style.display = "none";
                  document.getElementById('caseDropdown-' + filterIndex).style.display = "inline";
              }
          }
    
          // Check if the change event is triggered on a caseDropdown
          if (target.classList.contains('caseDropdown')) {
              filterIndex = parseInt(target.id.split('-')[1], 10);
              mint_filters[filterIndex].trigger = parseInt(target.value, 10);
          }
          if (target.classList.contains('behaviorDropdown2')) {
              filterIndex = parseInt(target.id.split('-')[1], 10);
              mint_filters[filterIndex].behave2 = parseInt(target.value, 10);
          }
    
          // Store the updated mint_filters array in local storage
          mint_localStore('mint_filters', JSON.stringify(mint_filters));
      });
    
      // Function to initialize the filter box with stored filters
      function initializeFilterBox() {
          var filterBox = document.getElementById('filterBox');
    
          // Clear existing content in the filter box
          filterBox.innerHTML = '';
    
          // Load mint_filters from local storage and parse the JSON string
          mint_filters = mint_localLoad('mint_filters');
          mint_filters = mint_filters ? JSON.parse(mint_filters) : [];
          // Iterate through each filter in mint_filters
          mint_filters.forEach(function(filter, index) {
              // Clone the template entry for each filter
              var templateEntry = document.getElementById('filterTemplate').cloneNode(true);
    
              // Set new IDs for the cloned elements
              templateEntry.id = 'mint_filter-' + index;
              templateEntry.querySelector('.removeBtn').id = 'removeBtn-' + index;
              templateEntry.querySelector('.behaviorDropdown').id = 'behaviorDropdown-' + index;
              templateEntry.querySelector('.caseDropdown').id = 'caseDropdown-' + index;
              templateEntry.querySelector('.behaviorDropdown2').id = 'behaviorDropdown2-' + index;
              templateEntry.querySelector('.andDropdown').id = 'andDropdown-' + index;
              templateEntry.querySelector('.addNewCharBtn').id = 'addNewCharBtn-' + index;
              templateEntry.querySelector('.newCharName').id = 'newCharName-' + index;
    
              // Set the filter icon
              templateEntry.querySelector('.icon').textContent = filter.icon;
    
              // Set the filter name
              templateEntry.querySelector('.name').textContent = filter.name;
    
              // Set the selected values for dropdowns based on filter properties
              templateEntry.querySelector('.behaviorDropdown').value = filter.behave;
              templateEntry.querySelector('.andDropdown').value = filter.case;
              templateEntry.querySelector('.behaviorDropdown2').value = filter.behave2;
              templateEntry.querySelector('.caseDropdown').value = filter.trigger;
    
              // Append the cloned template to the filterBox container
              filterBox.appendChild(templateEntry);
    
              if (filter.case === 0) {
                  document.getElementById('behaviorDropdown2-' + index).style.display = 'inline';
                  document.getElementById('caseDropdown-' + index).style.display = 'none';
              } else {
                  document.getElementById('behaviorDropdown2-' + index).style.display = 'none';
                  document.getElementById('caseDropdown-' + index).style.display = 'inline';
              }
    
              // Populate charNameContainer with names
              var charNameContainer = templateEntry.querySelector('.charNameContainer');
              filter.names = filter.names || []; // Ensure names property exists
              filter.names.forEach(function(name) {
                  var newCharEntry = document.createElement('div');
                  newCharEntry.className = name;
                  newCharEntry.innerHTML = '<a href="../../profile/' + name + '">' + name + '</a><button class="deleteCharEntry">×</button>';
                  charNameContainer.appendChild(newCharEntry);
              });
          });
      }
    
      initializeFilterBox();
    
      document.getElementById('showEmoji').addEventListener('click', function(event) {
          event.stopPropagation(); // Prevent the click event from propagating to the global click event listener
          this.classList.toggle('active'); // Toggle the 'active' class on #showEmoji
      });
    
      // Add a global click event listener to detect clicks outside of #showEmoji
      document.addEventListener('click', function(event) {
          var emojiButton = document.getElementById('showEmoji');
          var emojiPicker = document.querySelector('em-emoji-picker');
          var closeMenu = document.getElementById('mint_config-close');
          // Check if the click is outside both the emoji button and the emoji picker
          if (emojiButton && (!emojiButton.contains(event.target) && !emojiPicker.contains(event.target))) {
              // If the clicked element is not inside #showEmoji or the emoji picker, remove the 'active' class
              emojiButton.classList.remove('active');
          }
          if (event.target === closeMenu) {
              document.getElementById('mint_config-menu').style.display = 'none';
          }
      });
      // Finished processing all the config menu data, now we check for page-specific behaviour. 
      if (
        window.location.href.endsWith("account.srv") ||
        window.location.href.endsWith("account.srv#")
    ) {
        mint_configLoadedAccount();
    }
    if (
        window.location.href.endsWith("chat.srv") ||
        window.location.href.endsWith("chat.srv#")
    ) {
        mint_configLoadedChat();
    }
}

/*╔════════════════════════════════════════════════════════════════════════════════════════════════*\
░ ║ If Chat
\*╚════════════════════════════════════════════════════════════════════════════════════════════════*/
if (
      window.location.href.endsWith("chat.srv") ||
      window.location.href.endsWith("chat.srv#")
  ) {
/*╔------------------------------------------------------------------------------------------------*\
░ ║ Wait for original xchat.js to be loaded in, then replace it with the mint version.
\*╚------------------------------------------------------------------------------------------------*/
      new MutationObserver(async (mutations, observer) => {
          for (const mutation of mutations) {
              for (const addedNode of mutation.addedNodes) {
                  if (
                      addedNode.tagName === "SCRIPT" &&
                      addedNode.src.match(/xchat.js/)
                  ) {
                      observer.disconnect();
                      addedNode.remove();

                      // Create and append the new script tag
                      let newScript = document.createElement("script");
                      newScript.type = "text/javascript";
                      newScript.src = "https://mojojohoe.github.io/EkaScripts/xchat.js";
                      document.head.appendChild(newScript);
                  }
                  //break; // Exit the loop after the first matching script is found
              }
          }
      }).observe(document, {
          childList: true,
          subtree: true
      });

      document.addEventListener("keydown", function(event) {
        // Check if Num Lock key is pressed
        if (event.key === "NumLock" || event.code === "NumLock") {
            // Your code to handle Num Lock key press
            layoutEntirePage();
        }
      });
      document.addEventListener("DOMContentLoaded", function() {
          // Find all script elements with type "x-tmpl-mustache"
          var mustacheScripts = document.querySelectorAll('script[type="x-tmpl-mustache"]');

          // Iterate through each script element
          mustacheScripts.forEach(function(scriptElement) {
              // Check if the script element contains the specified class
              if (scriptElement.type === ('x-tmpl-mustache')) {
                  // Modify the content of the script element as needed
                  scriptElement.textContent = scriptElement.textContent.replaceAll(
                      'data-pmtarget="{{from.name}}">',
                      'data-pmtarget="{{from.name}}"><span class="info {{infoClass}}">{{info}}</span>'
                  );
                  scriptElement.textContent = scriptElement.textContent.replaceAll(
                      'data-pmtarget="{{to.name}}">',
                      'data-pmtarget="{{to.name}}"><span class="info {{infoClass}}">{{info}}</span>'
                  );
                  scriptElement.textContent = scriptElement.textContent.replaceAll(
                      '{{gender.title}}"></span>',
                      '{{gender.title}}"></span><span class="filters">{{icons}}</span>'
                  );
                  scriptElement.textContent = scriptElement.textContent.replaceAll(
                      '<tr id="ule{{sessionId}}"',
                      '<tr class="{{flash}}" id="ule{{sessionId}}"'
                  );
                  scriptElement.textContent = scriptElement.textContent.replaceAll(
                      '<td><span class="pmclick"',
                      '<td><span class="pmclick {{greyout}}"'
                  );
                  scriptElement.textContent = scriptElement.textContent.replaceAll(
                      '{{/eyecon}}{{^isPose}}',
                      '{{/eyecon}}{{^eyecon}}<span class="default" style="background-color: {{textColor}};"></span><img class="eyecon" title="{{msgTime}}" src="/img/eyecon/184938_7b8bea89078c42cbb62d31be9e23c76c.png"> {{/eyecon}}{{^isPose}}'
                  );
                  scriptElement.textContent = scriptElement.textContent.replaceAll(
                      /id}}">([^<]+)<time/g,
                      'id}}"><time'
                  );
                  scriptElement.textContent = scriptElement.textContent.replaceAll(
                      '<img class="eyecon"',
                      '<img class="eyecon" title="{{msgTime}}"'
                  );
              }
          });
      });

    }
      function mint_configLoadedChat(){  
    
        if (clockVisibility === null || clockVisibility === 1) {
            mint_localStore("mint_settingTheme-Time", 1);
            mint_toggleTheme_Time(1);
            document.getElementById("mint_toggleTime").checked = true;
          } else {
            mint_toggleTheme_Time(clockVisibility);
            document.getElementById("mint_toggleTime").checked = false;
          }
          
          
          if (themeVisibility === null || themeVisibility === 1) {
            mint_localStore("mint_settingTheme-Chat", 1);
            document.getElementById("mint_toggleChat").checked = true;
            mint_toggleTheme_Chat(1);
          } else {
            mint_toggleTheme_Chat(themeVisibility);
            document.getElementById("mint_toggleChat").checked = false;
          }
          
          
          if (statusVisibility === null || statusVisibility === 1) {
            mint_localStore("mint_settingTheme-Statuses", 1);
            document.getElementById("mint_toggleStatuses").checked = true;
            mint_toggleTheme_Statuses(1);
          } else {
            mint_toggleTheme_Statuses(statusVisibility);
            document.getElementById("mint_toggleStatuses").checked = false;
          }
          
          
          if (fontVisibility === null || fontVisibility === 1) {
            mint_localStore("mint_settingTheme-Font", 1);
            document.getElementById("mint_toggleFont").checked = true;
            mint_toggleTheme_Font(1);
          } else {
            mint_toggleTheme_Font(fontVisibility);
            document.getElementById("mint_toggleFont").checked = false;
          }
        
          var styleToggleTime;
    
          function mint_toggleTheme_Time(n) {
              if (!styleToggleTime && n === 1 || (styleToggleTime && n === 1)) {
                  styleToggleTime = GM_addStyle(`.chatmsg time {display: none;} .chatmsg {margin : 2px 0px 2px 6px;}`)
    mint_localStore("mint_settingTheme-Time", 1)
              } else if (!styleToggleTime) {
                mint_localStore("mint_settingTheme-Time", 0)
              } else {
                  styleToggleTime.parentNode.removeChild(styleToggleTime);
                  styleToggleTime = false;
                  mint_localStore("mint_settingTheme-Time", 0)
              }
          }
    
          var styleToggleFont;
    
          function mint_toggleTheme_Font(n) {
              if (!styleToggleFont && n === 1 || (styleToggleFont && n === 1)) {
                  styleToggleFont = GM_addStyle(`
          @import url('https://fonts.googleapis.com/css2?family=Sintony:wght@400;700&display=swap');
          #chat-pane,#ulist-pane  {
            font-family: "Sintony", sans-serif !important;
            font-weight: 300;
            font-style: normal;
          }
          time{
          font-family: Verdana, Arial, sans-serif !important;
          }`)
                  mint_localStore("mint_settingTheme-Font", 1)
              } else if (!styleToggleTime) {
                mint_localStore("mint_settingTheme-Font", 0)
              } else {
                  styleToggleFont.parentNode.removeChild(styleToggleFont);
                  styleToggleFont = false;
                  mint_localStore("mint_settingTheme-Font", 0)
              }
              
          }
    
          var styleToggleTheme;
    
          function mint_toggleTheme_Chat(n) {
              if (!styleToggleTheme && n === 1 || (styleToggleTheme && n === 1)) {
                  styleToggleTheme = GM_addStyle(`
    @import url("https://mojojohoe.github.io/EkaScripts/mint.css");     
    ::-webkit-scrollbar {
    width: 10px;
    }
    ::-webkit-scrollbar-thumb {
    background-color: #4a4a4a;
    border-radius: 5px;
    }
    ::-webkit-scrollbar {
    width: 8px;
    }
    ::-webkit-scrollbar-thumb {
    background-color: #4a4a4a;
    border-radius: 4px;
    }
    #main-page #ulist-pane {
    width:200px !important;
    }
    #ulist-itself > tbody > tr{
    display:flex;
    }
    #tabs-pane:has(li:only-of-type){
      display:none;
      height:0px !important;
    }
    .ignore{
    margin-left:3px;
    }
    .eyecon{
    width:50px;
    height:25px;
    object-fit: contain;
    }
    p.chatmsg:not(:has(img)){
      line-height:1.45 !important;
    }
    p.chatmsg:not(:has(img)) > .name, p.chatmsg:not(:has(img)) > .body > .name {
      position: relative;
      margin-left: 54px;
    }
    p.chatmsg > .default {
      display: inline-block;
      left: 12px;
      top: 2px;
      position: absolute;
      width: 25px;
      height: 21px;
      background-color: inherit;
      border-radius: 50%;
      z-index: -1;
    }
    .sender-input-group .td, #textcolor-select-x {
      border: 1px solid #2b2828 !important;
      }
    #main-sender-body {
      border: none;
      outline: none;
      -webkit-box-shadow: none;
      -moz-box-shadow: none;
      box-shadow: none;
      resize: auto;
    }
    .nav-tabs {
      border-bottom: 1px solid #2b2828 !important;
    }
    .nav-tabs > li.active > a {
    border: 1px solid #2b2828 !important;
    border-bottom: none !important;
    }
    #ulist-itself a[href^="../../profile/"] {
    display:none !important;
    }
    #chat-pane > span.pmclick > span.name, .chatmsg.private{
    font-size:16px;
    }
    #ulist-itself .highlight {
      font-size: inherit !important;
      cursor: pointer;
      text-decoration: none;
      visibility: hidden;
      position: relative;
      display: inline-block;
      width: 0px !important;
      left: 4px;
      z-index: 3;
    }
    tr[data-cid]:hover > td > .icon, tr[data-cid]:hover > td:after{
    opacity: 0.2;
    }
    tr.highlighted > td > .icon,tr.highlighted > td:after{
    opacity: 0.4;
    }
    tr[data-cid]{
    max-width:200px;
    }
    tr[data-cid]:hover > td > .pmclick,tr.ignored > td > .pmclick{
    display: flex;
    width: 150px;
    }
    tr[data-cid]:hover > td > .pmclick > span, tr.ignored  td > .pmclick > span{
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    }
    tr[data-cid]:hover > td {
    background-color:rgba(57, 49, 66, 0.2);
    }
    tr.highlighted{
    background-color:rgba(186, 129, 54, 0.2);
    }
    tr.ignored{
    background-color:rgba(255, 10, 35, 0.2);
    }
    #hover-box{
      height: 100%;
      width: 100%;
      left: 0;
      }
    [title="Jobix"] > span.name > span{
    display:inline-block;
    }
    [title="Jobix"] > span.name > span::first-letter{
    color:#67bbe0 !important;
    }
    `);
                  mint_localStore("mint_settingTheme-Chat", 1)
              } else if (!styleToggleTime) {
                mint_localStore("mint_settingTheme-Chat", 0)
              } else {
                  styleToggleTheme.parentNode.removeChild(styleToggleTheme);
                  styleToggleTheme = false;
                  mint_localStore("mint_settingTheme-Chat", 0)
              }
          }
    
          var styleToggleStatuses;
    
          function mint_toggleTheme_Statuses(n) {
            if (!styleToggleStatuses || n === 1 || (styleToggleStatuses && n === 1)) {
              styleToggleStatuses = GM_addStyle(`
    #chat-pane .chatmsg.private .pmclick .name:last-child:before {
    content:" ➔ " !important;
    opacity:0.5
    }
    #chat-pane .chatmsg.group .pmclick:after, #chat-pane .chatmsg.private .pmclick:after {
      content: "";
    }
    #chat-pane .chatmsg.group .pmclick:before, #chat-pane .chatmsg.private .pmclick:before {
      content: " ";
    }
    .icon[title=""],i.icon{
    position: relative;
    top:-2px;
    left:-4px;
    width: 18px;
    height: 18px;
    font-size: 14px;
    overflow: hidden;
    background-image: none !important;
    font-style: normal !important;
    }
    .tab-pane .info > .icon{
      top: -4px !important;
      left: -2px !important;
    }
    .tab-pane .pmclick {
      display: inline-block;
      margin-left: 5px;
    }
    .info > .icon {
    top:-1px;
    left:-3px;
    }
    .icon[title=""]:before,i.icon:before,
    .icon[title=""]:after,i.icon:after{
    position: absolute;
    top: 0;
    width: 55%;
    height: 100%;
    overflow: hidden;
    font-size: inherit;
    opacity: 1;
    }
    
    .icon.status-online:before {
    width: 100%;
    content: "🟢";
    }
    .icon.status-away:before {
    width: 100%;
    content: "🟡";
    }
    .icon.status-distracted:before {
    width: 100%;
    content: "🟠";
    }
    .icon.status-dnd:before {
    width: 100%;
    content: "🔴";
    }
    .icon.status-pred:before {
    content: "🔵";
    }
    .icon.status-prey:before {
    content: "🔵";
    }
    .icon.status-lfrp:before {
    content: "🔵";
    }
    .icon.status-open:before {
    content: "🔵";
    }
    .icon.status-pred:after {
    content: "🐯";
      left: 55%;
    transform: scale(-1, 1);
    }
    .icon.status-prey:after {
    content: "🐁";
      left: 55%;
    transform: scale(-1, 1);
    }
    .icon.status-lfrp:after {
    content: "📩";
      left: 55%;
    transform: scale(-1, 1);
    }
    .icon.status-open:after {
    content: "🌐";
      left: 55%;
    transform: scale(-1, 1);
    }
    .icon.status-gm:before, .icon.status-long:before {
    content: "🌐";
    }
    .icon.status-gm:after {
    content: "⛔";
    left: 55%;
    transform: scale(-1, 1);
    }
    .icon.status-long:after {
    content: "🔓";
    left: 55%;
    transform: scale(-1, 1);
    }
    .icon.status-ooc:before,.icon.status-ic:before {
    left:-1.5px;
    content: "○";
    color:#fff !important;
    font-size: 34px;
    line-height:14px;
    width:60%;
    }
    .icon.status-ooc:after,.icon.status-ic:after {
    content: "👤";
      left: 55%;
    transform: scale(-1, 1) ;
    filter: invert(1) brightness(2);
    }
    .icon.status-ic:before,.icon.status-ic:after {
    width:100%;
    }
    .icon.status-ic:after {
    left:0;
    }
    td:has(>.highlight:only-child):after {
    width: 100%;
    content: "🟢";
    position: relative;
    width: 18px;
    height: 18px;
    font-size: 14px;
    }
    `);
              mint_localStore("mint_settingTheme-Statuses", 1)
          } else if (!styleToggleTime) {
            mint_localStore("mint_settingTheme-Statuses", 0)
          } else {
              styleToggleStatuses.parentNode.removeChild(styleToggleStatuses);
              styleToggleStatuses = false;
              mint_localStore("mint_settingTheme-Statuses", 0)
          }
          
        }

        mint_createMenu();
        
        $(document).on('click', '.reply', function(event) {

            var messageId = $(this).closest('p').attr('id');
            var characterId = $(this).closest('[data-pmtarget]').attr('data-pmtarget');
            var inputField;


            if ($(this).closest('.hb-chat-pane').length > 0) {
                var formElement = $(this).closest('.tab-pane').find('.sender-form');
                inputField = formElement.find('textarea[name="body"]');
            } else {

                inputField = $('#main-sender-body');
            }

            if (inputField.length > 0) {
                inputField.val('⟲ ' + characterId + " :" + messageId + '║ ' + inputField.val());
            }

            event.preventDefault();
        });

        // Setup displaying emoji in chat bar and save the message to local storage for protecting roleplayers from losing a post.
        function handleTextInputChange(event) {
            var emoji = new EmojiConvertor();
            var inputValue = event.target.value;
            emoji.colons_mode = true;
            var newInputValue = emoji.replace_unified(inputValue);
            event.target.value = newInputValue;
            if (event.target.id === "main-sender-body") {
                ;
                mint_localStore("mint_chatInputBackupChat", newInputValue);
            } else {
                mint_localStore("mint_chatInputBackupHover", newInputValue);
            }

        }

        function handleKeyUp(event) {
            // Check if Page Up key is pressed
            if (event.key === "PageUp") {
                // Check if mint_msgCycle is the same as the recent history storage number
                if (mint_msgCycle === 0 && mint_savePositionLatch === 0) {
                    mint_savePositionLatch = 1;
                    // If mint_chatMsgTemp is NOT empty, set the input value to mint_chatMsgTemp
                    if (mint_chatMsgTemp !== "") {
                        event.target.value = mint_chatMsgTemp;
                    } else {
                        // If it is empty, save their current input as mint_chatMsgTemp
                        mint_chatMsgTemp = event.target.value;
                    }

                } else {
                    // If mint_msgCycle is different, load the previous message

                    mint_savePositionLatch = 0;
                    event.target.value = mint_localLoad(
                        "mint_chatMsgBackup_" + mint_msgCycle
                    );
                    mint_msgCycle = (mint_msgCycle - 1 + 10) % 10; // Adjust for cycling
                }
            }
        }
        // Attach the text change event handler to the textarea with id 'main-sender-body'
        document
            .getElementById("main-sender-body")
            .addEventListener("input", handleTextInputChange);
        // Attach the keyup event handler to the textarea with id 'main-sender-body'
        document
            .getElementById("main-sender-body")
            .addEventListener("keyup", handleKeyUp);

              // Here we manage the local storage of the last 10 chat messages.
      var mint_msgCycle = mint_localLoad("mint_chatBackupMsgNumber");
      var mint_chatMsgTemp = "";
      var mint_savePositionLatch = 0;    
        // Restoring a lost message.
        var savedInputValueChat = mint_localLoad("mint_chatInputBackupChat");
        if (savedInputValueChat) {
            document.getElementById("main-sender-body").value = savedInputValueChat;
        }
        var savedInputValueHover = mint_localLoad("mint_chatInputBackupChat");
        if (savedInputValueHover) {
            $(".flan-control.sender-body").value = savedInputValueHover;
        }
        var styleTag;

        document.addEventListener('keydown', function(event) {
            if (event.keyCode === 35) {
                // Check if the style tag already exists
                if (!styleTag) {
                    // Add the style dynamically
                    styleTag = GM_addStyle(`
    #chat-pane > p:not(.nameding):not(.private) {
      display: none;
    }
  `);
                }
            }
        });

        document.addEventListener('keyup', function(event) {
            if (event.keyCode === 35) {
                // Remove the style tag if it exists
                if (styleTag) {
                    styleTag.parentNode.removeChild(styleTag);
                    styleTag = null; // Reset the variable
                }

                // Reset other styles or perform other actions
                var chatPane = document.getElementById('chat-pane');
                chatPane.scrollTop = chatPane.scrollHeight;
                toggleAutoScroll(false);
            }
        });
  
        // Now we reorder the list items based on data-code attribute.
        function orderAndUpdateStatusList() {
            const statusList = document.getElementById("status-list");
            setTimeout(function() {
                const items = Array.from(statusList.children);
  
                items.sort(function(a, b) {
                    const codeA = getCodeValue(a);
                    const codeB = getCodeValue(b);
  
                    return getStatusOrder(codeA) - getStatusOrder(codeB);
                });
  
                // Re-append the sorted and updated list items to the statusList
                items.forEach((item) => {
                    statusList.appendChild(item);
                    updateStatusText(item);
                });
            }, 1000);
        }
        // Helper function to get the data-code attribute value
        function getCodeValue(item) {
            const anchor = item.querySelector("a");
            return anchor ? anchor.getAttribute("data-code") : "";
        }
        // Helper function to get the order of a status
        function getStatusOrder(code) {
            const order = [
                "online",
                "distracted",
                "away",
                "dnd",
                "lfrp",
                "open",
                "pred",
                "prey",
                "long",
                "gm",
                "ic",
                "ooc"
            ];
            return order.indexOf(code);
        }
        // Helper function to change the text to the more comprehensive defenitions.
        function updateStatusText(item) {
            const anchor = item.querySelector("a");
            if (!anchor) return;
  
            const code = getCodeValue(item);
  
            switch (code) {
                case "lfrp":
                    anchor.innerHTML = '<i class="icon status-lfrp"></i> LF Private RP';
                    break;
                case "open":
                    anchor.innerHTML = '<i class="icon status-open"></i> LF Public RP';
                    break;
                case "pred":
                    anchor.innerHTML = '<i class="icon status-pred"></i> LFRP as Pred';
                    break;
                case "prey":
                    anchor.innerHTML = '<i class="icon status-prey"></i> LFRP as Prey';
                    break;
                case "long":
                    anchor.innerHTML = '<i class="icon status-long"></i> In an Open RP';
                    break;
                case "gm":
                    anchor.innerHTML = '<i class="icon status-gm"></i> In a Closed RP';
                    break;
                case "ic":
                    anchor.innerHTML = '<i class="icon status-ic"></i> In Character';
                    break;
                case "ooc":
                    anchor.innerHTML = '<i class="icon status-ooc"></i> Out of Character';
                    break;
                default:
                    break;
            }
        }
        function mint_createMenu() {
          const navBar = document.querySelector(".nav.navbar-nav");
    
          if (navBar) {
            const mintMenu = document.createElement("li");
            mintMenu.className = "dropdown";
    
            mintMenu.innerHTML = `
                    <a href="#" class="dropdown-toggle minty" data-toggle="dropdown">
                        <i class="glyphicon-adjust glyphicon"></i> Mint <span class="caret"></span>
                    </a>
                    <ul class="dropdown-menu minty" role="menu">
                        <li id="mint_toggle-time"><a href="#"><i class="glyphicon-time glyphicon"></i> Settings Moved</a></li>
                        <li><a href="privlog.srv" target="_blank"><i class="glyphicon-sunglasses glyphicon"></i> To Config</a></li>
                    </ul>`;
            GM_addStyle(
              `.minty {color: #898f83 !important;} .minty:hover {color: #a7b897 !important;} .minty a {color: #98eb96 !important;} .minty a:hover {color: #333 !important;}`
            );
            navBar.appendChild(mintMenu);
    
          }
        }
        layoutEntirePage();
    };
  
/*╔════════════════════════════════════════════════════════════════════════════════════════════════*\
░ ║ If Character Select
\*╚════════════════════════════════════════════════════════════════════════════════════════════════*/

    function mint_configLoadedAccount() {
        GM_addStyle(`#characterBin {
            position: relative;
          }
          #characterBin::before {
            content: "⮞";
            position: absolute;
            width: 20px;
            height: 20px;
            font-size: 20px;
            left: 5px;
          }
          #characterBin[open]::before {
            content: "⮟";}`);

          var mint_binnedChars = JSON.parse(localStorage.getItem('mint_binnedChars')) || [];

          const mint_characterBin = document.createElement('details');
          mint_characterBin.id = "characterBin";
          var appendLoc = document.getElementsByClassName("form-group")[2];

          mint_characterBin.innerHTML = `
      <summary>
        <div class="btn btn-default btn-block" style="border-top-right-radius: 0; border-bottom-right-radius: 0;">
          <b>Character Bin</b>
        </div>
      </summary>`;

          appendLoc.appendChild(mint_characterBin);

          var allInputGroups = document.getElementsByClassName("input-group");
          for (var i = 0; i < allInputGroups.length; i++) {
    var currentElement = allInputGroups[i];
    var editList = currentElement.querySelector('ul'); 
              allInputGroups[i].id = "charDiv_" + i;
              const mint_sendToBin = document.createElement('li');
              mint_sendToBin.innerHTML = `<a href="#" class="send-to-bin"><i class="glyphicon-trash glyphicon"></i> Send to Bin</a>`;
              mint_sendToBin.id = "charBinAdd_" + i;
              editList.appendChild(mint_sendToBin);

              const mint_removeFromBin = document.createElement('li');
              mint_removeFromBin.innerHTML = `<a href="#" class="remove-from-bin"><i class="glyphicon-export glyphicon"></i> Remove from Bin</a>`;
              mint_removeFromBin.id = "charBinRemove_" + i;
              editList.appendChild(mint_removeFromBin);

              mint_removeFromBin.style.display = "none";


              mint_binnedChars.forEach(function(characterName) {
                  var buttons = document.querySelectorAll('button[value="' + characterName + '"]');

                  buttons.forEach(function(button) {
                      var characterBin = document.getElementById('characterBin');
                      characterBin.appendChild(button.closest('div'));
                  });
              });

          }

          window.addEventListener('load', function() {
              mint_binnedChars.forEach(function(characterName) {
                  var buttons = document.querySelectorAll('button[value="' + characterName + '"]');

                  buttons.forEach(function(button) {
                      var characterBin = document.getElementById('characterBin');
                      characterBin.appendChild(button.closest('div'));
                  });
              });
          });
          document.addEventListener('click', function(event) {
            var clickedElement = event.target;
            var editLi = clickedElement.closest('li'); 
            var idREF = parseInt(editLi.id.split('_')[1]);
            
        
            if (clickedElement.classList.contains('remove-from-bin')) {
                clickedElement.style.display = "none";
                document.getElementById("charBinAdd_" + idREF).style.display = "list-item";
                appendLoc.prepend(document.getElementById("charDiv_" + idREF));
                mint_binnedChars = mint_binnedChars.filter(name => name !== characterName);
                localStorage.setItem('mint_binnedChars', JSON.stringify(mint_binnedChars));
            } else if (clickedElement.classList.contains('send-from-bin')) {
                clickedElement.style.display = "none";
                document.getElementById("charBinRemove_" + idREF).style.display = "list-item";
                characterBin.appendChild(document.getElementById("charDiv_" + idREF));
                mint_binnedChars.push(characterName);
                localStorage.setItem('mint_binnedChars', JSON.stringify(mint_binnedChars));
            }
        });




      }


})();