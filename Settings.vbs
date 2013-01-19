'------------------------------------------------------------------------------
' start this when window is opened
'------------------------------------------------------------------------------
Sub Window_Onload
	settings_init()
End sub

'------------------------------------------------------------------------------
' Select the TimeTag calendar
'------------------------------------------------------------------------------
Sub selectCalendar
On Error Resume Next

	Set outlookApp = CreateObject("Outlook.Application")
	
	Set apptFolder = outlookApp.getNameSpace("MAPI").PickFolder()
	
	// save ID and name in settings
	document.getElementById("calendarID").innerText = apptFolder.EntryID()
	document.getElementById("calendarName").innerText = apptFolder.FolderPath()
End Sub

