# Upload notes

Four folders, ready to drop into `Jenipher-E/OmniKin-Design` alongside the existing `Feature-1`:

- `Feature-2` household access
- `Feature-3` shopping lists
- `Feature-4` tasks
- `Full-Journey` features 1 to 4 end to end

Each folder is flat and self-contained, matching how `Feature-1` is already stored: shared kit files (`omni-kit.jsx`, `design-canvas.jsx`) are copied into every folder, and all script paths inside the HTML point at siblings in the same folder. Nothing outside its own folder is referenced, so each one works on its own.

## To commit
1. Download this package and unzip it.
2. In the repo, use Add file, then Upload files, and drag the four folders in.
3. Commit to `main` with a message such as "Add Features 2 to 4 and the full journey".

Folder names use hyphens, not spaces, so the paths stay clean. HTML filenames keep their spaces, matching `Feature-1`.
