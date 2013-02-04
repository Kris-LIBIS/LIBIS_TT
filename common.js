function stringToBool(str) {
  if (typeof str === 'string') {
    if (str.toLowerCase() == 'true') {
      return true;
    }
    if (str.toLowerCase() == 'false') {
      return false;
    }
    return (parseInt(str) > 0);
  }
  return !!str;
}

function boolToString(b) {
  return b ? 'true':'false';
}

function getClearAtNewProject() {
	try {
		return stringToBool(System.Gadget.Settings.readString("ClearAtNewProject"));
	} catch (e) {
		return true;
	}
}

function getClearAtNewActivity() {
	try {
		return stringToBool(System.Gadget.Settings.readString("ClearAtNewActivity"));
	} catch (e) {
		return true;
	}
}

function setClearAtNewProject(value) {
	try {
		System.Gadget.Settings.writeString("ClearAtNewProject", boolToString(value));
	} catch(e) {}
}

function setClearAtNewActivity(value) {
	try {
		System.Gadget.Settings.writeString("ClearAtNewActivity", boolToString(value));
	} catch(e) {}
}

try {
// Default setting is on
if (!System.Gadget.Settings.writeString("ClearAtNewProject")) {
  setClearAtNewProject(true);
}

if (!System.Gadget.Settings.writeString("ClearAtNewActivity")) {
  setClearAtNewActivity(true);
}
} catch(e) {}
