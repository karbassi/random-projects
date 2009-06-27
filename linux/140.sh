# How to:
#     chmod +x tw.sh
#     tw.sh karbassi 2
# 
# Parameters:
#     tw.sh USERNAME NUMBER_OF_PAGES
for (( i=1; i<=$2; i++ )) do curl --basic --silent "http://twitter.com/$1?page=$i"; done | grep "<span class=\"entry-content\">" | sed 's/<span class="entry-content">/\
&/g' |  sed 's/<span class="entry-content">\(.*\)<\/span><span.*/\1/' | sed '1d' | sed 's/<[^>]*>//g' | sed 's/\&lt;/\</g' | sed 's/\&gt;/\>/g' | sed 's/\&quot;/"/g' | sed 's/\\/\//' | while read -e x; do if [ `echo $x | wc -c | sed s/\ //g` -gt "140" ]; then echo $x; fi; done