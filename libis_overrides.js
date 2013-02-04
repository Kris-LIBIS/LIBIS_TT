function storeReferencesToFormElements() {
  window.projectSelect = new Select("select_project", { disableOnEmpty: true, emptyMessage: projects.length == 0 ? "No projects" : "No such projects", preselectSingleton: true });
  window.activitySelect = new Select("select_activity", { disableOnEmpty: true, emptyMessage: "No activities", helpMessage: " " });
  window.projectSearcher = document.getElementById("search_projects");
  window.createButton = document.getElementById("create_button");
  window.tagsField = document.getElementById("tags");
}

function populateProjectSelect(search) {
  var previousCurrentProject = getCurrentProject();
  var stillSelected = false;
  projectSelect.clear();
  for (i = 0; i < projects.length; i++) {
    var project = projects[i];
    if (search === "" || project.name.toLowerCase().indexOf(search) != -1) {
      var wasSelected = project == previousCurrentProject;
      stillSelected = stillSelected || wasSelected;
      projectSelect.addItem(project, wasSelected);
    }
  }
  projectSelect.finalize();
  if (!stillSelected) {
    populateActivitySelect();
  }
}

function populateActivitySelect() {
  var currentProject = getCurrentProject();
  if (activitySelect.forProject != currentProject) {
    activitySelect.forProject = currentProject;
    activitySelect.clear();
    if (currentProject) {
      var activities = currentProject.activities;
      for (var i = 0; i < activities.length; i++) {
        activitySelect.addItem(activities[i]);
      }
      createButton.disabled = false;
    } else {
      createButton.disabled = true;
    }
    activitySelect.finalize();
    showTags();
  }
}

function showTags() {
  tagsField.value = getCurrentTags();
}

function searchProjects() {
  populateProjectSelect(projectSearcher.value.toLowerCase());
}

// Activity
function Activity(name, tag){
  this.name = name;
  this.tag = tag;
}

// Project
function Project(name, tag, activities) {
  this.name = name;
  this.tag = tag;
  this.activities = activities;
}

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

function getCurrentProject() {
  return projectSelect.getSelectedItem();
}

function getCurrentActivity() {
  return activitySelect.getSelectedItem();
}

function getCurrentTags() {
  var project = getCurrentProject();
  if (project) {
    var activity = getCurrentActivity();
    var tags = "#" + project.tag;
    if (activity) {
      tags += " @" + activity.tag;
    }
    return tags;
  } else {
    return "";
  }
}

function sort_projects(){
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
}
