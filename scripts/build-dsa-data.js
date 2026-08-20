const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const OUTPUT_DIR = path.resolve(ROOT_DIR, 'frontend', 'src', 'data');
const OUTPUT_FILE = path.resolve(OUTPUT_DIR, 'dsa-data.json');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Function to recursively read files in a directory
function getFilesRecursively(dir, allowedExts = []) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFilesRecursively(filePath, allowedExts));
    } else {
      const ext = path.extname(file).toLowerCase();
      if (allowedExts.length === 0 || allowedExts.includes(ext)) {
        results.push(filePath);
      }
    }
  });
  return results;
}

const DOCS_DIR = path.resolve(ROOT_DIR, 'docs');

// Identify the 13 modules (00 to 12)
const moduleDirs = fs.readdirSync(DOCS_DIR).filter(file => {
  const stat = fs.statSync(path.join(DOCS_DIR, file));
  return stat.isDirectory() && /^\d{2}-/.test(file);
}).sort();

const langMapping = {
  python: { label: 'Python', ext: ['.py'] },
  cpp: { label: 'C++', ext: ['.cpp', '.h'] },
  java: { label: 'Java', ext: ['.java'] },
  js: { label: 'JavaScript', ext: ['.js'] }
};

const dsaData = [];

// Read the master README.md if it exists
const masterReadmePath = path.join(DOCS_DIR, 'index.md');
let masterReadmeContent = '';
if (fs.existsSync(masterReadmePath)) {
  masterReadmeContent = fs.readFileSync(masterReadmePath, 'utf-8');
}

for (const dirName of moduleDirs) {
  const dirPath = path.join(DOCS_DIR, dirName);
  
  // Read README.md for the module
  const readmePath = path.join(dirPath, 'README.md');
  let readmeContent = '';
  if (fs.existsSync(readmePath)) {
    readmeContent = fs.readFileSync(readmePath, 'utf-8');
  }
  
  // Format Module title from directory name (e.g. 01-Arrays-and-Strings -> 01. Arrays & Strings)
  const order = dirName.substring(0, 2);
  let name = dirName.substring(3).replace(/-/g, ' ');
  // title case
  name = name.split(' ').map(word => {
    if (word.toLowerCase() === 'and') return '&';
    if (word.toLowerCase() === 'bst') return 'BST';
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');
  const moduleTitle = `${order}. ${name}`;
  
  const moduleData = {
    id: dirName,
    title: moduleTitle,
    readme: readmeContent,
    topics: {} // topic -> language -> [files]
  };
  
  // Look inside each language folder: python, cpp, java, js
  const languages = ['python', 'cpp', 'java', 'js'];
  for (const lang of languages) {
    const langPath = path.join(dirPath, lang);
    if (!fs.existsSync(langPath)) continue;
    
    // Find all subdirectories/files inside the language folder (these represent topics)
    const items = fs.readdirSync(langPath);
    for (const item of items) {
      const itemPath = path.join(langPath, item);
      const stat = fs.statSync(itemPath);
      
      if (stat.isDirectory()) {
        const topicName = item.replace(/_/g, ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        if (!moduleData.topics[topicName]) {
          moduleData.topics[topicName] = {};
        }
        if (!moduleData.topics[topicName][lang]) {
          moduleData.topics[topicName][lang] = [];
        }
        
        const files = getFilesRecursively(itemPath, langMapping[lang].ext);
        for (const file of files) {
          const content = fs.readFileSync(file, 'utf-8');
          const relativeName = path.relative(itemPath, file);
          moduleData.topics[topicName][lang].push({
            name: relativeName,
            content: content
          });
        }
      } else {
        // File directly in the language folder (fallback topic: "General")
        const ext = path.extname(item).toLowerCase();
        if (langMapping[lang].ext.includes(ext)) {
          const topicName = 'General';
          if (!moduleData.topics[topicName]) {
            moduleData.topics[topicName] = {};
          }
          if (!moduleData.topics[topicName][lang]) {
            moduleData.topics[topicName][lang] = [];
          }
          const content = fs.readFileSync(itemPath, 'utf-8');
          moduleData.topics[topicName][lang].push({
            name: item,
            content: content
          });
        }
      }
    }
  }
  
  dsaData.push(moduleData);
}

// Create a final export object including metadata and data
const outputData = {
  masterReadme: masterReadmeContent,
  modules: dsaData
};

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(outputData, null, 2), 'utf-8');
console.log(`Successfully generated DSA data inside ${OUTPUT_FILE}`);
