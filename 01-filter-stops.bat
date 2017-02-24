psql^
 --username=postgres^
 --dbname VG^
 -f 01-filter-stops.sql^
 --set=stops_input="'%cd%\unfiltered-stops.txt'"^
 --set=stops_output="'%cd%\stops.txt'"^
 --set=selected_rs="'01001,01002,01003,01004,01051,01053,01054,01055,01056,01057,01058,01059,01060,01061,01062,02000'"
