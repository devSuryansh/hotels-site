#!/bin/bash

# Get the list of untracked files using git status --porcelain
# The --porcelain format outputs '??' for untracked files.
files=$(git status --porcelain | grep "^??" | awk '{print $2}')

# Check if any untracked files were found
if [ -z "$files" ]; then
  echo "No untracked files found to commit."
  exit 0
fi

echo "Adding and committing each untracked file individually..."

# Loop through each file and commit it separately
for file in $files; do
  echo "Adding and committing: $file"
  git add "$file"
  git commit -m "Add: $file"
  if [ $? -ne 0 ]; then
    echo "Error committing $file. Aborting."
    exit 1
  fi
done

echo "All untracked files have been committed individually."
echo "To push these changes to origin, run: git push"
