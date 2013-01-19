function settings_init()
{
	var vName = System.Gadget.Settings.readString("CalendarName");
	var vID = System.Gadget.Settings.readString("CalendarID");
	
	calendarName.innerText = vName;
	calendarID.innerText = vID;
	
	clearAtNewProject.checked = getClearAtNewProject();
	clearAtNewActivity.checked = getClearAtNewActivity();
}
	
System.Gadget.onSettingsClosing = SettingsClosing;

function SettingsClosing(event)
{
	if (event.closeAction == event.Action.commit) 
	{
		System.Gadget.Settings.writeString("CalendarName", calendarName.value);
		System.Gadget.Settings.writeString("CalendarID", calendarID.value);
		setClearAtNewProject(clearAtNewProject.checked);
		setClearAtNewActivity(clearAtNewActivity.checked);
	}
	event.cancel = false;
}

function String2Bool(value) {
	if (typeof value === 'string') {
		value = value.toLowerCase();
		if (value === 'true') {
			return true;
		}
		if (value === 'false') {
			return false;
		}
		return (parseInt(value) > 0);
	}
	return !!x;
}

function Bool2String(value) {
	return (value ? 'true' : 'false');
}

function getClearAtNewProjectString() {
	return System.Gadget.Settings.readString("ClearAtNewProject");
}

function getClearAtNewProject() {
	return String2Bool(getClearAtNewProjectString());
}

function getClearAtNewActivityString() {
	return System.Gadget.Settings.readString("ClearAtNewActivity");
}

function getClearAtNewActivity() {
	return String2Bool(getClearAtNewActivityString());
}

function setClearAtNewProject(value) {
	System.Gadget.Settings.writeString("ClearAtNewProject",Bool2String(value));
}

function setClearAtNewActivity(value) {
	System.Gadget.Settings.writeString("ClearAtNewActivity",Bool2String(value));
}

function setClearAtNewProjectDefault(value) {
	if (getClearAtNewProjectString() === '') {
		setClearAtNewProject(value);
	}
}

function setClearAtNewActivityDefault(value) {
	if (getClearAtNewActivityString() === '') {
		setClearAtNewActivity(value);
	}
}

