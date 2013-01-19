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
  return stringToBool(System.Gadget.Settings.readString("ClearAtNewProject"));
}

function getClearAtNewActivity() {
  return stringToBool(System.Gadget.Settings.readString("ClearAtNewActivity"));
}

function setClearAtNewProject(value) {
  System.Gadget.Settings.writeString("ClearAtNewProject", boolToString(value));
}

function setClearAtNewActivity(value) {
  System.Gadget.Settings.writeString("ClearAtNewActivity", boolToString(value));
}

// Default setting is on
if (!System.Gadget.Settings.writeString("ClearAtNewProject")) {
  setClearAtNewProject(true);
}

if (!System.Gadget.Settings.writeString("ClearAtNewActivity")) {
  setClearAtNewActivity(true);
}

