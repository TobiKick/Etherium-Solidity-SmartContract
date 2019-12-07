import hashlib
import sys

if len(sys.argv) > 1:
    fileName = sys.argv[1]
else:
    fileName = 'part2.js'


hasher = hashlib.sha256()
with open(fileName, 'rb') as f:
    hasher.update(f.read())
    result = hasher.hexdigest()
    print(result)

file_out = open("hexdigest.txt","a")
file_out.write(result)
file_out.close() 