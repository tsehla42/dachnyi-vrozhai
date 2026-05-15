import fs from 'fs';
import path from 'path';
import { transliterate } from '../../utils';

const publicImagesDir = path.join(process.cwd(), 'public', 'images');

interface RenameMapping {
  oldPath: string;
  newPath: string;
  oldName: string;
  newName: string;
}

const renameMappings: RenameMapping[] = [];

function renameImagesInDirectory(dir: string) {
  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);

    if (item.isDirectory()) {
      // Recursively process subdirectories
      renameImagesInDirectory(fullPath);
    } else if (item.isFile()) {
      // Check if filename contains Cyrillic characters
      const hasCyrillic = /[а-яА-ЯіїєґІЇЄҐ]/.test(item.name);

      if (hasCyrillic) {
        // Get file extension
        const ext = path.extname(item.name);
        const nameWithoutExt = item.name.slice(0, -ext.length);

        // Transliterate the filename (without extension)
        const newNameWithoutExt = transliterate(nameWithoutExt, false, true);
        const newName = newNameWithoutExt + ext;
        const newPath = path.join(dir, newName);

        renameMappings.push({
          oldPath: fullPath,
          newPath: newPath,
          oldName: item.name,
          newName: newName
        });
      }
    }
  }
}

// Collect all files that need to be renamed
console.log('Scanning for images with Cyrillic names...\n');
renameImagesInDirectory(publicImagesDir);

if (renameMappings.length === 0) {
  console.log('No files with Cyrillic names found!');
  process.exit(0);
}

console.log(`Found ${renameMappings.length} files to rename:\n`);

// Display the rename mappings
for (const mapping of renameMappings) {
  const relativePath = path.relative(publicImagesDir, path.dirname(mapping.oldPath));
  console.log(`  ${relativePath || '.'}/`);
  console.log(`    ${mapping.oldName} → ${mapping.newName}`);
}

console.log('\nRenaming files...\n');

// Actually rename the files
for (const mapping of renameMappings) {
  try {
    fs.renameSync(mapping.oldPath, mapping.newPath);
    console.log(`✓ Renamed: ${mapping.oldName}`);
  } catch (error) {
    console.error(`✗ Failed to rename ${mapping.oldName}:`, error);
  }
}

console.log('\n✓ Done! All images have been renamed.');
console.log('\nNOTE: You may need to update references to these images in your content files.');

