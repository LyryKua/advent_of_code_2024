for i in {1..10000}
do
 echo $i
 node index.js $i > $i.txt
done

find . -type f -name "*.txt" -exec grep -l "########################" {} + | xargs cat > output.txt