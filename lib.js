System.Gadget.settingsUI = "Settings.html";

projects = projects.sort(function(a,b) {
  var regex = /^(\d+)(\.|[a-z])(\d)?/

  a.name.match(regex);
  var nA = parseInt(RegExp.$1,10);
  var cA = RegExp.$2;
  var n2A = 0;
  if (cA == '.') {
    n2A = parseInt(RegExp.$3,10);
  }

  b.name.match(regex);
  var nB = parseInt(RegExp.$1,10);
  var cB = RegExp.$2;
  var n2B = 0;
  if (cB == '.') {
    n2B = parseInt(RegExp.$3,10);
  }

  if (nA == nB) {
    if (cA == cB) {
      return n2A == n2B ? 0 : n2A > n2B ? 1 : -1;
    }
    return cA == cB ? 0 : cA > cB ? 1 : -1;
  }
  return nA > nB ? 1 : -1;
});

// Select
Select = function (id, options) {
  if (typeof options == "undefined") {
    options = {};
  }
  this.element = document.getElementById(id);
  this.disableOnEmpty = options.disableOnEmpty;
  this.emptyMessage = options.emptyMessage;
  this.helpMessage = options.helpMessage;
  this.preselectSingleton = options.preselectSingleton;
  this.clear = function () {
    // TODO: check if this is cross-browser
    this.element.length = 0;
  };
  this.addItem = function (item, select) {
    var option = document.createElement("option");
    option.text = item.name;
    option.item = item;
    if (select) { option.selected = true; }
    this.element.add(option);
  };
  this.prependMessage = function (caption) {
    var option = document.createElement("option");
    option.text = caption;
    option.selected = true;
    if (navigator.appName == 'Microsoft Internet Explorer') {
      this.element.add(option, 0);
    } else {
      this.element.add(option, this.element.options[0]);
    }
  };
  this.finalize = function () {
    if (this.element.length == 0) {
      if (this.disableOnEmpty) { this.element.disabled = true; }
      if (this.emptyMessage) { this.prependMessage(this.emptyMessage); }
    } else {
      if (this.disableOnEmpty) { this.element.disabled = false; }
      if (this.preselectSingleton && this.element.length == 1) { this.element.options[0].selected = true; }
      if (this.helpMessage) { this.prependMessage(this.helpMessage); }
    }
  };
  this.getSelectedItem = function () {
    var index = this.element.selectedIndex;
    if (index != -1) {
      return this.element.options[index].item;
    } else {
      return null;
    }
  };
};

// To initialize the gadget
function initializeSidebar() {
  //createSidebarGadget();
  storeReferencesToFormElements();
  populateProjectSelect("");
  storeReferencesToExtraElements();
  populateInstitutionSelect();
  if (System.Gadget.docked) {
    SmallView();
  } else {
    FullView();
  }
}

function getCurrentExtendedTags() {
  var tags = getCurrentTags();
	
}

function copyTags()
{
  window.clipboardData.setData("Text", getCurrentAllTags() + " ");
}

function makeAppointment()
{
  copyTags();
  createAppointment();
}

function getCurrentAllTags() {
  var tags = getCurrentTags();
  tags += getCurrentExtraTags();
  return tags;
}

function showAllTags() {
  showTags();
  showExtraTags();
}

function projectChanged() {
  populateActivitySelect();
  populateSubprojectSelect();
  showAllTags();
}

function activityChanged() {
  populateSubprojectSelect();
  showAllTags();
}


// Declare the dock and undock event handlers.
System.Gadget.onDock = SmallView;
System.Gadget.onUndock = FullView;

// Gadget width and height.
var dockedWidth = 120;
var dockedHeight = 120;
var undockedWidth = 400;
var undockedHeight = 520;

// Amount of time desired to perform transition (in seconds).
var timeTransition = 0.5;

function FullView() {
	System.Gadget.beginTransition();
	var oBody = document.body.style;
	oBody.width = undockedWidth;
	oBody.height = undockedHeight;
	document.getElementById('listBoxes').style.visibility = 'visible';
	System.Gadget.endTransition(System.Gadget.TransitionType.morph, timeTransition);
}

function SmallView() {
    System.Gadget.beginTransition();
    var oBody = document.body.style;
    oBody.width = dockedWidth;
    oBody.height = dockedHeight;
	document.getElementById('listBoxes').style.visibility = 'hidden';
    System.Gadget.endTransition(System.Gadget.TransitionType.morph, timeTransition);
}
