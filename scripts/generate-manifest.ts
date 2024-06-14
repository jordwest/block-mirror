type ManifestVersion3 = {
    manifest_version: 3,
    permissions?: string[],
    optional_permissions?: string[],
    host_permissions?: string[],
    optional_host_permissions?: string[],
}

const manifest: ManifestVersion3 = {
    manifest_version: 3,
}

console.log(JSON.stringify(manifest))