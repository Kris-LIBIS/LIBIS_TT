var projects = [
    new Project("1.1. LIBISnet", "lbsn", [
        new Activity("Andere", "oth"),
        new Activity("Conversies", "conv"),
        new Activity("Meetings", "meet"),
        new Activity("Projecten", "pro"),
        new Activity("Prospects", "pros"),
        new Activity("Uitbating", "uit")
    ]),
    new Project("1.2. PBS Vlaams-Brabant", "pbs", [
        new Activity("Andere", "oth"),
        new Activity("Conversies", "conv"),
        new Activity("Meetings", "meet"),
        new Activity("Projecten", "pro"),
        new Activity("Prospects", "pros"),
        new Activity("Uitbating", "uit")
    ]),
    new Project("1.3. Open Vlacc", "vlacc", [
        new Activity("Andere", "oth"),
        new Activity("Conversies", "conv"),
        new Activity("Meetings", "meet"),
        new Activity("Projecten", "pro"),
        new Activity("Prospects", "pros"),
        new Activity("Uitbating", "uit")
    ]),
    new Project("13. Diverse projecten", "oth", [
        new Activity("Andere", "oth"),
        new Activity("Europeana Inside", "inside"),
        new Activity("Okapi", "okapi")
    ]),
    new Project("14. Vep (Vlaams E-book Platform)", "vep", [
        new Activity("Andere", "oth"),
        new Activity("Conversies", "conv"),
        new Activity("Meetings", "meet"),
        new Activity("Projecten", "pro"),
        new Activity("Uitbating", "uit")
    ]),
    new Project("2. Elektronische bronnen", "eres", [
        new Activity("Andere", "oth"),
        new Activity("Conversies", "conv"),
        new Activity("Meetings", "meet"),
        new Activity("Projecten", "pro"),
        new Activity("Prospects", "pros"),
        new Activity("Uitbating", "uit")
    ]),
    new Project("3. Lirias", "lirias", [
        new Activity("Andere", "oth"),
        new Activity("Associatie", "ass"),
        new Activity("Conversies", "conv"),
        new Activity("Meetings", "meet"),
        new Activity("Projecten", "pro"),
        new Activity("Prospects", "pros"),
        new Activity("Uitbating", "uit")
    ]),
    new Project("4. Lias", "lias", [
        new Activity("Andere", "oth"),
        new Activity("Conversies", "conv"),
        new Activity("Meetings", "meet"),
        new Activity("Projecten", "pro"),
        new Activity("Prospects", "pros"),
        new Activity("Uitbating", "uit")
    ]),
    new Project("6. Heron", "heron", [
        new Activity("Andere", "oth"),
        new Activity("Conversies", "conv"),
        new Activity("Meetings", "meet"),
        new Activity("Projecten", "pro"),
        new Activity("Prospects", "pros"),
        new Activity("Uitbating", "uit")
    ]),
    new Project("7. Limo", "limo", [
        new Activity("Andere", "oth"),
        new Activity("Conversies", "conv"),
        new Activity("Meetings", "meet"),
        new Activity("Projecten", "pro"),
        new Activity("Prospects", "pros"),
        new Activity("Uitbating", "uit")
    ]),
    new Project("9. Alma", "alma", [
        new Activity("Andere", "oth"),
        new Activity("Conversies", "conv"),
        new Activity("Meetings", "meet"),
        new Activity("Projecten", "pro"),
        new Activity("Prospects", "pros"),
        new Activity("Uitbating", "uit")
    ]),
    new Project("999. Rust", "rust", [
        new Activity("Afwijkend gedrag > C4", "afwijking"),
        new Activity("Verlof", "verlof"),
        new Activity("Ziek", "ziek")
    ]),
    new Project("99a. Intern LIBIS", "libis", [
        new Activity("Andere", "oth"),
        new Activity("Conferenties, congressen, lezingen etc.", "conf"),
        new Activity("Events a.h.", "event"),
        new Activity("Expertise (literatuur en onderzoek)", "expert"),
        new Activity("IT Ondersteuning", "it"),
        new Activity("Klantenrelaties, account management etc.", "klant"),
        new Activity("LIBIS financien", "fin"),
        new Activity("LIBIS personeel", "pers"),
        new Activity("LIBIS planning", "plan"),
        new Activity("Mails allerhande, administratie, prullaria", "admin"),
        new Activity("Meetings", "meet"),
        new Activity("PR en marketing: folders, websites etc.", "pr"),
        new Activity("Toepassingen zoals hd, pm, tt etc.", "toep")
    ]),
    new Project("99b. Inbedding KU Leuven", "kul", [
        new Activity("Andere", "oth"),
        new Activity("Business cases en planning", "plan"),
        new Activity("Meetings", "meet"),
        new Activity("Projecten", "pro")
    ]),
    new Project("99c. Associatie", "assoc", [
        new Activity("Andere", "oth"),
        new Activity("Meetings", "meet")
    ])
];

// To initialize the gadget
function initialize() {
  createHTML();
  storeReferencesToFormElements();
  populateProjectSelect("");
}

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
function Select(id, options) {
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
    this.element.add(option, null);
  };
  this.prependMessage = function (caption) {
    var option = document.createElement("option");
    option.text = caption;
    option.selected = true;
    this.element.add(option, this.element.options[0]);
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

function openEventComposer() {
  google.calendar.composeEvent({ title: getCurrentTags(), allDay: true });
}

function createHTML() {
  var html = '<table>\n<tbody>\n<tr>\n<td class=\'domain\'>LIBIS<\/td>\n<\/tr>\n<tr>\n<td class=\'title\'>1. Select your project<\/td>\n<\/tr>\n<tr>\n<td>\n<form action=\'#\' onsubmit=\'return false; \'>\n<input id=\'search_projects\' onkeyup=\'searchProjects();\' type=\'text\' value=\'\'>\n<select id=\'select_project\' onchange=\'populateActivitySelect()\' onclick=\'populateActivitySelect()\' size=\'5\'><\/select>\n<\/form>\n<\/td>\n<\/tr>\n<tr>\n<td class=\'title\'>2. Select your activity<\/td>\n<\/tr>\n<tr>\n<td>\n<select id=\'select_activity\' onchange=\'showTags()\' onclick=\'showTags()\'><\/select>\n<\/td>\n<\/tr>\n<tr>\n<td class=\'title\'>3. Copy your tags<\/td>\n<\/tr>\n<tr>\n<td>\n<input id=\'tags\' onfocus=\'this.select();\' readonly>\n<\/td>\n<\/tr>\n<tr>\n<td class=\'submit\'>\n<button id=\'create_button\' onclick=\'openEventComposer()\'>Edit event<\/button>\n<\/td>\n<\/tr>\n<\/tbody>\n<\/table>\n';
  var content = document.createElement("div")
  content.innerHTML = html;
  var loading = document.getElementById("loading");
  var body = loading.parentNode;
  body.removeChild(loading);
  for (var i = 0; i < content.childNodes.length; i++) {
    body.appendChild(content.childNodes[i]);
  }
}
