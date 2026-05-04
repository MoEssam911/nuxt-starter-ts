import { existsSync, readdirSync, statSync } from 'node:fs';
import { resolve } from 'node:path';

/**
 * Auto-discovers and registers pages from all feature modules.
 *
 * Scans app/modules/[*]/pages/ for .vue files and adds them
 * as module-prefixed routes.
 */
export const extendModulePages = (pages: any[]) => {
  const modulesDir = resolve(process.cwd(), 'app', 'modules');

  if (!existsSync(modulesDir)) return;

  const modules = readdirSync(modulesDir).filter((entry) => {
    const entryPath = resolve(modulesDir, entry);
    return statSync(entryPath).isDirectory();
  });

  for (const moduleName of modules) {
    const modulePagesDir = resolve(modulesDir, moduleName, 'pages');

    if (!existsSync(modulePagesDir)) continue;

    const files = readdirSync(modulePagesDir);

    for (const file of files) {
      if (!file.endsWith('.vue')) continue;

      const name = file.replace('.vue', '');
      let routePath = '/' + moduleName;

      if (name !== 'index') {
        routePath = `/${moduleName}/${name.replace(/\[(.+?)\]/g, ':$1')}`;
      }

      pages.push({
        name: moduleName + '-' + name,
        path: routePath,
        file: resolve(modulePagesDir, file),
      });
    }
  }
};
