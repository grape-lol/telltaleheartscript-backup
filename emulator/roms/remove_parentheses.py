import os
import re

# Define the directory path
directory = r"C:\Users\Bob\Documents\Nebula\emulator\roms\atari2600"

# Regex pattern to match anything in parentheses
pattern = re.compile(r'\s*\(.*?\)\s*')

# Iterate over all files in the directory
for filename in os.listdir(directory):
    # Create the full file path
    full_path = os.path.join(directory, filename)
    
    # Check if it's a file
    if os.path.isfile(full_path):
        # Remove text in parentheses and trim extra spaces
        new_filename = pattern.sub('', filename).strip()
        
        # Create the full new file path
        new_full_path = os.path.join(directory, new_filename)
        
        # Rename the file if the new filename is different
        if new_full_path != full_path:
            os.rename(full_path, new_full_path)
            print(f'Renamed: "{filename}" to "{new_filename}"')

print("Renaming completed.")
