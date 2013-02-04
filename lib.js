// To initialize the gadget
function initializeSidebar() {
	//createSidebarGadget();
	storeReferencesToFormElements();
	populateProjectSelect("");
	storeReferencesToExtraElements();
	populateInstitutionSelect();
//	if (System.Gadget.docked) {
//		SmallView();
//	} else {
//		FullView();
//	}
}

function getCurrentExtendedTags() {
	var tags = getCurrentTags();
	
}

function copyTags()
{
	$('#tags').select();
	window.clipboardData.setData("Text", getCurrentAllTags() + " ");
}

function makeAppointment()
{
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
	var clearSelection = getClearAtNewProject();
	populateInstitutionSelect(clearSelection);
	populateSubprojectSelect(clearSelection);
	showAllTags();
}

function activityChanged() {
	var clearSelection = getClearAtNewActivity();
	populateInstitutionSelect(clearSelection);
	populateSubprojectSelect(clearSelection);
	showAllTags();
}


// Declare the dock and undock event handlers.
//System.Gadget.onDock = SmallView;
//System.Gadget.onUndock = FullView;

// Gadget width and height.
var dockedWidth = 120;
var dockedHeight = 120;
var undockedWidth = 400;
var undockedHeight = 380;

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
