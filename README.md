# nah.sh-stops

This is a simple script to download all [NAH.SH](http://www.nah.sh) stops as [GTFS-compatible CSV](https://developers.google.com/transit/gtfs/reference/stops-file).

The script uses the following endpoint:

```
http://nah.sh.hafas.de/bin/query.exe/dny?performLocating=2&tpl=stop2json&look_stopclass=2147483647&look_minx=5000000&look_miny=47000000&look_maxx=15000000&look_maxy=56000000
```

It starts from bounding box `(5, 47, 15, 56)` and works down to smaller quadrants.

The script produces CSV output in the following format:

```
stop_id,stop_name,stop_lon,stop_lat,stop_code
"3420017","Flensburg Kauslund",9.489535,54.802917,""
```

# Usage

```
npm install
node index.js
```

# Disclaimer

Usage of this script may or may not be legal, use on your own risk.  
This repository provides only source code, no data.

# License

Source code is licensed under [BSD 2-clause license](LICENSE). No license and no guarantees implied on the produced data, produce and use on your own risk.