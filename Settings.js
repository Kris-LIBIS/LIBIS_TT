function init()
{
  var vName = System.Gadget.Settings.readString("CalendarName");
  var vID = System.Gadget.Settings.readString("CalendarID");
  
  calendarName.innerText = vName;
  calendarID.innerText = vID;
}
  
System.Gadget.onSettingsClosing = SettingsClosing;

function SettingsClosing(event)
{
  if (event.closeAction == event.Action.commit) 
  {
    System.Gadget.Settings.writeString("CalendarName", calendarName.value);
    System.Gadget.Settings.writeString("CalendarID", calendarID.value);
  }
  event.cancel = false;
}
