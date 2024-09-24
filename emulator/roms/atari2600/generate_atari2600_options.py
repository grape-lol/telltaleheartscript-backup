import os

# Path to the ROMs directory for Atari 2600
rom_directory = r"C:\Users\Bob\Documents\Nebula\emulator\roms\atari2600"

# Generate the options for each ROM file
options = []
for filename in os.listdir(rom_directory):
    if filename.endswith(".bin") or filename.endswith(".a26"):  # Add other extensions as needed
        option_value = f"roms/atari2600/{filename}"
        option_text = filename.rsplit('.', 1)[0]  # Remove the extension for display
        # Format: { value: "path", text: "display text" }
        options.append(f'{{ value: "{option_value}", text: "{option_text}" }}')

# Join the options into a single string for JavaScript output
options_js = ",\n              ".join(options)

# Output the options JavaScript
print(options_js)
