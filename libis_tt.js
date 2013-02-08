// initialize the gadget
function initializeSidebar() {
	storeReferencesToFormElements();
	storeReferencesToExtraElements();
	clearSelection();
	if (favorites.length > 0) {
		favoritesSelect.selectItem(0);
		tagsChanged();
	} else {
		projectSelect.selectItem(0);
		projectChanged();
	}
}

// clear all selected items
function clearSelection() {
	activitySelect.selectItem(0);
	populateProjectSelect('');
	populateInstitutionSelect(true);
	populateSubprojectSelect(true);
	populateFavoritesSelect();
	showAllTags();
}	

// copy tags to clipboard
function copyTags()
{
	addFavorite(getCurrentAllTags());
	window.clipboardData.setData("Text", getCurrentAllTags() + " ");
}

// create an appointment in Outlook
function makeAppointment()
{
	addFavorite(getCurrentAllTags());
	createAppointment();
}

// event handler: project changed
function projectChanged() {
	if (projectChanged.guard) { return; }
	try { projectChanged.guard = true;
		projectChangedCore();
		showAllTags();
	} finally { projectChanged.guard = false; }
}

function projectChangedCore() {
	populateActivitySelect();
	activitySelect.selectItem(0);
	populateInstitutionSelect(true);
	populateSubprojectSelect(true);
}

// event handler: activity changed
function activityChanged() {
	if (activityChanged.guard) { return; }
	try { activityChanged.guard = true;
		activityChangedCore();
		showAllTags();
	} finally { activityChanged.guard = false; }
}

function activityChangedCore() {
	populateInstitutionSelect(true);
	populateSubprojectSelect(true);
}

// event handler: institution changed
function institutionChanged() {
	if (institutionChanged.guard) { return; }
	try { institutionChanged.guard = true;
		institutionChangedCore();
		showAllTags();
	} finally { institutionChanged.guard = false; }
}

function institutionChangedCore() {
	populateSubprojectSelect(true);
}

// event handler: subproject changed
function subprojectChanged() {
	if (subprojectChanged.guard) { return; }
	try { subprojectChanged.guard = true;
		subprojectChangedCore();
		showAllTags();
	} finally { subprojectChanged.guard = false; }
}

function subprojectChangedCore() {
	populateInstitutionSelect(true);
}

// event handler: tags changed
function tagsChanged() {
	if (tagsChanged.guard) { return; }
	try { tagsChanged.guard = true;
		var tagstring = getCurrentFavorite();
		if (is_favorite(tagstring)) {
			favoritesSelect.setInput(null);
			populateFavoritesSelect();
		}
		clearSelection();
		var tags = tagstring.split(' ');
		for (var i = 0; i < tags.length; i++) {
			var tag = tags[i];
			switch(tag.charAt(0)) {
				case '#':
					selectItem(projectSelect, tag.substr(1));
					projectChangedCore();
					break;
				case '@':
					selectItem(activitySelect, tag.substr(1));
					activityChangedCore();
					break;
				case '$':
					institutionChangedCore();
					subprojectChangedCore();
					tag = tag.substr(1);
					selectItem(institutionSelect, tag);
					selectItem(subprojectSelect, tag);
					break;
				default:
					alert("Bad tagcode found: " + tag.charAt(0));
			}
		}
		showAllTags();
	} finally { tagsChanged.guard = false; }
}

// select an item in a <select> list
function selectItem(selector, value) {
	for (var i = 0; i < selector.element.options.length; i++) {
		var option = selector.element.options[i];
		if (option.item === value || option.text == value || (option.item && option.item.tag == value)) {
			selector.element.selectedIndex = i;
			return;
		}
	}
}

// replacement for showTags()
function showAllTags() {
	var currentTags = getCurrentAllTags();
	if (is_favorite(currentTags)) {
		favoritesSelect.setInput(null);
	} else {
		favoritesSelect.setInput(currentTags);
	}
	populateFavoritesSelect();
	selectItem(favoritesSelect, currentTags);
}

// replacement for getCurrentTags()
function getCurrentAllTags() {
	var tags = getCurrentTags();
	tags += getCurrentExtraTags();
	return tags;
}

// get the selected extra tag for institution/subproject
function getCurrentExtraTags() {
	var institution = getCurrentInstitution();
	if (institution) {
		return " $" + institution.tag;
	}
	var subproject = getCurrentSubproject();
	if (subproject) {
		return " $" + subproject.tag;
	}
	return "";
}
	
// -------------------------------------------------------------
// --- Support for institution/subproject tags and favorites ---
// -------------------------------------------------------------

// Institution object
function Institution(tag,name) {
	this.name = name;
	this.tag = tag;
}
 
// SubProject object
function SubProject(tag, name, for_tag_only) {
	this.name = name;
	this.tag = tag;
	this.limit = null;
	if (for_tag_only) {
		this.limit = for_tag_only;
	}
}

function subproject_valid_for(subproject, project, activity) {
	if(!subproject.limit) {
		return true;
	}
	if (project == null) {
		return false;
	}
	if (subproject.limit == '#' + project.tag) {
		return true;
	}
	if (activity && subproject.limit == '#' + project.tag + ' @' + activity.tag) {
		return true;
	}
	return false;
}

// keep track of select objects for institution and subproject
function storeReferencesToExtraElements() {
	window.institutionSelect = new Select("select_institution", { disableOnEmpty: true, emptyMessage: "No institutions", helpMessage: " " });
	window.subprojectSelect = new Select("select_subproject", { disableOnEmpty: true, emptyMessage: "No projects", helpMessage: " " });
	window.favoritesSelect = new Select("tags", { disableOnEmpty: false });
}

// (re-)initializes the institution select list
function populateInstitutionSelect(clearSelection) {
	var currentInstitution = getCurrentInstitution();
	institutionSelect.clear();
	for (var i = 0; i < institutions.length; i++) {
		institutionSelect.addItem(institutions[i]);
	}
	institutionSelect.finalize();
	if (!clearSelection && currentInstitution) {
		selectItem(institutionSelect,currentInstitution);
	}
}
	
// (re-)initializes the subproject select list
function populateSubprojectSelect(clearSelection) {
	var currentProject = getCurrentProject();
	var currentActivity = getCurrentActivity();
	var currentSubproject = getCurrentSubproject();
	subprojectSelect.forProject = currentProject;
	subprojectSelect.forActivity = currentActivity;
	subprojectSelect.clear();
	for (var i = 0; i < subprojects.length; i++) {
		var subproject = subprojects[i];
		if (subproject_valid_for(subproject,currentProject,currentActivity)) {
			subprojectSelect.addItem(subproject);
		}
	}
	subprojectSelect.finalize();
	if (!clearSelection && currentSubproject) {
		selectItem(subprojectSelect,currentSubproject);
	}
}

// refresh favorites select list
function populateFavoritesSelect() {
	var currentFavorite = getCurrentFavorite();
	favoritesSelect.clear();
	for (var i = 0; i < favorites.length; i++) {
		favoritesSelect.addItem(favorites[i]);
	}
	favoritesSelect.finalize();
	selectItem(favoritesSelect,currentFavorite);
}

// add current tags to the favorites list
function addFavorite(tags) {
	add_to_favorites(tags);
	save_favorites();
	populateFavoritesSelect();
}
	
// get the selected institution
function getCurrentInstitution() {
	return institutionSelect.getSelectedItem();
}

// get the selected subproject
function getCurrentSubproject() {
	return subprojectSelect.getSelectedItem();
}

// get the selected favorite
function getCurrentFavorite() {
	return favoritesSelect.getSelectedItem();
}
