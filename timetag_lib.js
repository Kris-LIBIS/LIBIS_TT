function storeReferencesToFormElements() {
  window.projectSelect = new Select("select_project", { disableOnEmpty: true, emptyMessage: projects.length == 0 ? "No projects" : "No such projects", preselectSingleton: true });
  window.activitySelect = new Select("select_activity", { disableOnEmpty: true, emptyMessage: "No activities", helpMessage: " " });
  window.projectSearcher = document.getElementById("search_projects");
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

