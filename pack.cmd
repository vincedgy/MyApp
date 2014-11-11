del /y ..\MyApp.tar.bak
rename ..\MyApp.tar ..\MyApp.tar.bak
7z a -ttar ..\MyApp.tar * -x!node_modules -x!static\components -x!.git -x!.idea -x!*.log