
Sub createAppointment
On Error Resume Next

  Set outlookApp = CreateObject("Outlook.Application")
  Dim apptFolder
  
  folder_id = System.Gadget.Settings.readString("CalendarID")
  
  If folder_id <> "" Then
    Set apptFolder = outlookApp.getNameSpace("MAPI").GetFolderFromID(folder_id)
  End If
  
  If IsEmpty(apptFolder) Then
    Set apptFolder = outlookApp.getNameSpace("MAPI").PickFolder()
  End If
  
  If IsEmpty(apptFolder) Then
    return
  End If
  
  System.Gadget.Settings.writeString "CalendarID", apptFolder.EntryID()
  System.Gadget.Settings.writeString "CalendarName", apptFolder.FolderPath()
  
  ' Create a new Appointment item and fill it in
  Set apptItem = apptFolder.Items.Add("IPM.Appointment")
  apptItem.Subject = getCurrentAllTags()
  apptItem.ReminderSet = false

  d = Now
  
  ' Remove seconds
  d = DateAdd("s", Second(d) * -1, d)
  ' Round up/down to half hour. Cap is 5 minutes before
  m = Minute(d)
  If m <= 25 Then
    m = -1 * m
  ElseIf m <= 55 Then
    m = 30 - m
  Else
    m = 60 - m
  End If
  d = DateAdd("n", m, d)

  apptItem.Start = d
  
  ' Standard duration
  apptItem.Duration = 60

  apptItem.Display

End Sub
