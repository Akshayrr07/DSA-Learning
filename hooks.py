import os
import shutil

def on_pre_build(config, **kwargs):
    docs_build_dir = config['docs_dir']
    print(f"Preparing documentation build in: {docs_build_dir}")
    
    # Clean the build directory first, preserving only .gitkeep
    if os.path.exists(docs_build_dir):
        for item in os.listdir(docs_build_dir):
            if item != '.gitkeep':
                path = os.path.join(docs_build_dir, item)
                if os.path.isdir(path):
                    shutil.rmtree(path)
                else:
                    os.remove(path)
    else:
        os.makedirs(docs_build_dir, exist_ok=True)

    # Copy the master README.md to docs_build/index.md
    if os.path.exists("README.md"):
        shutil.copy("README.md", os.path.join(docs_build_dir, "index.md"))
        print("Copied README.md -> index.md")

    # Copy all numbered topic directories (00- to 12-)
    for item in os.listdir("."):
        if os.path.isdir(item) and item[0].isdigit() and '-' in item:
            dest = os.path.join(docs_build_dir, item)
            # Exclude code files if wanted, but copying everything preserves images/assets
            shutil.copytree(item, dest)
            print(f"Copied directory: {item} -> {dest}")
