#!/bin/bash

# Get the list of unstaged deleted files using git status --porcelain
# The --porcelain format outputs ' D' for unstaged deleted files.
files=$(git status --porcelain | grep "^ D" | awk '{print $2}')

# Check if any deleted files were found
if [ -z "$files" ]; then
  echo "No deleted files found to commit."
  exit 0
fi

echo "Removing and committing each deleted file individually..."

# Loop through each file and commit its deletion separately
for file in $files; do
  echo "Removing and committing: $file"
  # git rm stages the deletion, so a subsequent commit is correct.
  git rm "$file"
  git commit -m "Delete: $file"
  if [ $? -ne 0 ]; then
    echo "Error committing deletion of $file. Aborting."
    exit 1
  fi
done

echo "All deleted files have been committed individually."
echo "To push these changes to origin, run: git push"
