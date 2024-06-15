const packageJson = JSON.parse(Deno.readTextFileSync('package.json'));

const manifest: ManifestVersion3 = {
    manifest_version: 3,
    name: "Block Mirror",
    description: "Reflect before you visit time sink websites",
    version: packageJson.version,
    permissions: ['tabs'],
    background: {
        type: "module",
        service_worker: "service-worker.js",
    }
}

console.log(JSON.stringify(manifest, null, 2))

/*****************
 *     Types
 *****************/
type ManifestVersion3 = {
    manifest_version: 3,
    name: string,
    description: string,
    version: string,
    permissions?: string[],
    optional_permissions?: string[],
    host_permissions?: string[],
    optional_host_permissions?: string[],
    background?: {
        service_worker?: string,
        type?: 'module',
    }
}

interface Deno {
    readTextFileSync(path: string): string;
}
declare const Deno: Deno;
