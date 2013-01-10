var institutions = [
  new Institution('acad','acad'),
  new Institution('acv','acv'),
  new Institution('assoc','assoc'),
  new Institution('bb','bb'),
  new Institution('bpb','bpb'),
  new Institution('cag','cag'),
  new Institution('ckrc','ckrc'),
  new Institution('ecb','ecb'),
  new Institution('faro','faro'),
  new Institution('ffin','ffin'),
  new Institution('fpo','fpo'),
  new Institution('hub','hub'),
  new Institution('kadoc','kadoc'),
  new Institution('kahosl','kahosl'),
  new Institution('katho','katho'),
  new Institution('kbc','kbc'),
  new Institution('kbin','kbin'),
  new Institution('khbo','khbo'),
  new Institution('tmk','tmk'),
  new Institution('khl','khl'),
  new Institution('khlim','khlim'),
  new Institution('kmkg','kmkg'),
  new Institution('kmma','kmma'),
  new Institution('kul','kul'),
  new Institution('lbsn','lbsn'),
  new Institution('tma','tma'),
  new Institution('tmm','tmm'),
  new Institution('libar','libar'),
  new Institution('luca','luca'),
  new Institution('nbb','nbb'),
  new Institution('serv','serv'),
  new Institution('vdic','vdic'),
  new Institution('vlp','vlp')
].sort(function(a,b) { return ((a.name < b.name) ? -1 : ((a.name > b.name) ? 1 : 0)); });

var subprojects = [
  new SubProject('adlib','Adlib','#heron @pro'),
  new SubProject('alma','Alma'),
  new SubProject('anjou','Bijbel van Anjou','#heron @pro'),
  new SubProject('BKCIRC','BKCIRK - Agora','#limo @pro'),
  new SubProject('blog','Blog',' #libis @pr'),
  new SubProject('br','Bibliotheekraad','#kul @meet'),
  new SubProject('cab','Commissie Algemeen Beheer','#kul @meet'),
  new SubProject('cover','Coverserver voor Bibnet'),
  new SubProject('digit','Vergaderingen ivm digitalisatie: werkgroep digitalisering, …','#kul @meet'),
  new SubProject('etd','Ingest van e-thesissen'),
  new SubProject('exc','Ex Cathedra voor de UB'),
  new SubProject('flan','Flandrica'),
  new SubProject('ict','ICT: vergaderingen voorbereidingen, nota\'s… voor KU leuven'),
  new SubProject('lias','Lias'),
  new SubProject('limo','Limo'),
  new SubProject('lmt','LMT: vergaderingen voorbereidingen, nota\'s...','#libis @meet'),
  new SubProject('locator','Locator','#lbsn @pro'),
  new SubProject('ml','Uitbating MetaLib','#eres @uit'),
  new SubProject('mtub','MTUB: vergaderingen voorbereidingen, nota\'s...','#kul @meet'),
  new SubProject('netman','netman, installatie van CD\'s e.d.','#eres @pro'),
  new SubProject('openid','Openid voor Bibnet','#vlacc @pro'),
  new SubProject('rfid','RFid voor LIBISnet en PBS, organisatie opgeven als noot','#lbsn @pro'),
  new SubProject('scope','Uitbating Scope','#lias @uit'),
  new SubProject('sfx','Uitbating SFX','#eres @uit'),
  new SubProject('stcv','Eenmalige conversie STCV','#lbsn @stev'),
  new SubProject('stuiter','Project: vernieuwing stuiterproxy'),
  new SubProject('team','Teamoverleg: vergaderingen voorbereidingen, nota\'s...','#libis @meet'),
  new SubProject('test','Testen'),
  new SubProject('toegang','Toegangscontrole'),
  new SubProject('training','Training en opleiding'),
  new SubProject('unicat','Unicat','#lbns @pro'),
  new SubProject('verde','Uitbating Verde','#eres @uit'),
  new SubProject('vvbad','Vergaderingen VVBAD','#libis @meet'),
  new SubProject('zizo','Conversies PBS','#pbs @conv'),
  new SubProject('Heron','Heron'),
  new SubProject('info','Informatie aan Zee','#libis @event'),
  new SubProject('lbsndag','LIBISnet gebruikersdag','#libis @event'),
  new SubProject('lzine','LIBISzine','#libis @pr'),
  new SubProject('support','Managementondersteuning Jo','#libis @admin'),
  new SubProject('tool','Tool voor het vervangen van publicaties','#lirias @pro'),
  new SubProject('ontw','Ontwikkelingen @mire','#lirias'),
  new SubProject('ng','Next Generation Lirias','#lirias'),
  new SubProject('V4','Versie 4 Limo','#limo @pro'),
  new SubProject('link','Link Builder','#limo')
].sort(function(a,b) { return ((a.name < b.name) ? -1 : ((a.name > b.name) ? 1 : 0)); });

function Institution(tag,name) {
  this.name = name;
  this.tag = tag;
}
 
function SubProject(tag, name, for_tag_only) {
  this.name = name;
  this.tag = tag;
  this.limit = null;
  if (for_tag_only) {
    this.limit = for_tag_only;
  }
  this.valid_for = function(project, activity) {
	if (project == null) {
		return false;
	}
    if(!this.limit) {
      return true;
    }
    if (this.limit == '#' + project.tag) {
      return true;
    }
    if (activity && this.limit == '#' + project.tag + ' @' + activity.tag) {
      return true;
    }
    return false;
  };
}

function selectItem(selector, item) {
  for (var i = 0; i < selector.element.options.length; i++) {
    if (selector.element.options[i].item == item) {
      selector.element.selectedIndex = i;
      return;
    }
  }
}

function storeReferencesToExtraElements() {
  window.institutionSelect = new Select("select_institution", { disableOnEmpty: true, emptyMessage: "No institutions", helpMessage: " " });
  window.subprojectSelect = new Select("select_subproject", { disableOnEmpty: true, emptyMessage: "No projects", helpMessage: " " });
}


function populateInstitutionSelect() {
  institutionSelect.clear();
  for (var i = 0; i < institutions.length; i++) {
    institutionSelect.addItem(institutions[i]);
  }
  institutionSelect.finalize();
}
  
function populateSubprojectSelect(force) {
  var currentProject = getCurrentProject();
  var currentActivity = getCurrentActivity();
  var currentSubproject = getCurrentSubproject();
  if (subprojectSelect.forProject != currentProject || subprojectSelect.forActivity != currentActivity || force) {
    subprojectSelect.forProject = currentProject;
    subprojectSelect.forActivity = currentActivity;
    subprojectSelect.clear();
    for (var i = 0; i < subprojects.length; i++) {
      var subproject = subprojects[i];
      if (subproject.valid_for(currentProject,currentActivity)) {
        subprojectSelect.addItem(subproject);
      }
    }
    subprojectSelect.finalize();
  }
  if (!force) {
    selectItem(subprojectSelect,currentSubproject);
  }
}

function institutionChanged() {
  populateSubprojectSelect(true);
  showAllTags();
}

function subprojectChanged() {
  populateInstitutionSelect();
  showAllTags();
}

function getCurrentInstitution() {
  return institutionSelect.getSelectedItem();
}

function getCurrentSubproject() {
  return subprojectSelect.getSelectedItem();
}

function getCurrentExtraTags() {
  var institution = getCurrentInstitution();
  if (institution) {
    return " §" + institution.tag;
  }
  var subproject = getCurrentSubproject();
  if (subproject) {
    return " §" + subproject.tag;
  }
  return "";
}
	
function showExtraTags() {
  tagsField.value += getCurrentExtraTags();
}