#!/bin/bash

# Script to add GNU AGPL v3.0 license notice to all .ts files
# Usage: ./add_license.sh [directory]

# Set the target directory (default to current directory)
TARGET_DIR="${1:-.}"

# License notice to be added
LICENSE_NOTICE='/**
 *  Copyright (C) 2025 Jan Leigh Muñoz
 * 
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU Affero General Public License as published
 *  by the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 * 
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU Affero General Public License for more details.
 * 
 *  You should have received a copy of the GNU Affero General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 **/'

# Function to check if file already has license
has_license() {
    local file="$1"
    # Check if the file starts with the copyright notice
    head -n 5 "$file" | grep -q "Copyright (C) 2025 Jan Leigh Muñoz"
}

# Function to add license to a file
add_license() {
    local file="$1"
    local temp_file=$(mktemp)
    
    # Add license notice followed by original content
    echo "$LICENSE_NOTICE" > "$temp_file"
    echo "" >> "$temp_file"
    cat "$file" >> "$temp_file"
    
    # Replace original file with new content
    mv "$temp_file" "$file"
    echo "Added license to: $file"
}

# Main script
echo "Adding GNU AGPL v3.0 license notice to TypeScript files in: $TARGET_DIR"
echo "----------------------------------------"

# Counter for processed files
count=0
skipped=0

# Find all .ts files recursively
while IFS= read -r -d '' file; do
    if has_license "$file"; then
        echo "Skipping (already has license): $file"
        ((skipped++))
    else
        add_license "$file"
        ((count++))
    fi
done < <(find "$TARGET_DIR" -name "*.ts" -type f -print0)

echo "----------------------------------------"
echo "License addition complete!"
echo "Files processed: $count"
echo "Files skipped: $skipped"

# Optional: Show git status if in a git repository
if [ -d ".git" ]; then
    echo ""
    echo "Git status:"
    git status --porcelain | grep "\.ts$" || echo "No TypeScript files modified"
fi
