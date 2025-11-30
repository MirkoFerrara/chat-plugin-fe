const fs = require('fs-extra');
const concat = require('concat');
const path = require('path');

(async function build() {

  const distPath = './dist/chat-plugin-fe';
  
  console.log('\n🔍 Building chat-plugin-fe...');
  
  if (!fs.existsSync(distPath)) {
    console.error(`❌ Cartella ${distPath} non trovata!`);
    return;
  }

  const files = fs.readdirSync(distPath);
  console.log('📂 Files trovati:', files);

  const polyfillsFile = files.find(f => f.startsWith('polyfills') && f.endsWith('.js'));
  const mainFile = files.find(f => f.startsWith('main') && f.endsWith('.js'));

  if (!polyfillsFile || !mainFile) {
    console.error('❌ File polyfills.js o main.js non trovati!');
    console.log('Files disponibili:', files);
    return;
  }

  const sourceFiles = [
    path.join(distPath, polyfillsFile),
    path.join(distPath, mainFile)
  ];

  console.log('\n📦 Concatenando files:');
  
  for (let file of sourceFiles) {
    const stats = fs.statSync(file);
    console.log(`   ✓ ${path.basename(file)} (${(stats.size / 1024).toFixed(2)} KB)`);
  }

  const pluginDir = './plugin';
  const targetFile = path.join(pluginDir, 'chat-plugin-fe.js');
  
  await fs.ensureDir(pluginDir);
  await concat(sourceFiles, targetFile);

  const stats = fs.statSync(targetFile);
  console.log(`\n✅ Plugin creato: plugin/chat-plugin-fe.js`);
  console.log(`📊 Dimensione: ${(stats.size / 1024).toFixed(2)} KB\n`);
})();