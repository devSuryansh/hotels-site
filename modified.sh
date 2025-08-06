#!/bin/bash

# Get the list of modified files using git status --porcelain
# The --porcelain format outputs one line per file, with status codes at the beginning.
# ' M' indicates a modified file not yet staged.
files=$(git status --porcelain | grep "^ M" | awk '{print $2}')

# Check if any files were found
if [ -z "$files" ]; then
  echo "No modified files found to commit."
  exit 0
fi

echo "Committing each modified file individually..."

# Loop through each file and commit it separately
for file in $files; do
  echo "Adding and committing: $file"
  git add "$file"
  git commit -m "Update: $file"
  if [ $? -ne 0 ]; then
    echo "Error committing $file. Aborting."
    exit 1
  fi
done

echo "All modified files have been committed individually."
echo "To push these changes to origin, run: git push"