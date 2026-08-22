import sys

file_path = r"D:\meem Organic World\Website\meemorganicworld\components\home\HomeClient.tsx"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Make a backup
with open(file_path + ".bak", "w", encoding="utf-8") as f:
    f.write(content)

# Swap 620 246 (old origin) to 596 266 (new origin)
content = content.replace("620 246", "TEMPORIGIN_PATH")
content = content.replace("\"620\" cy=\"246\"", "\"TEMPORIGIN_X\" cy=\"TEMPORIGIN_Y\"")

# Change old UAE (600 264) to 620 246 (new Pakistan)
content = content.replace("600 264", "620 246")
content = content.replace("\"600\" cy=\"264\"", "\"620\" cy=\"246\"")
content = content.replace("title=\"UAE\"", "title=\"Pakistan\"")

# Change TEMPORIGIN to 596 266 (new UAE origin)
content = content.replace("TEMPORIGIN_PATH", "596 266")
content = content.replace("\"TEMPORIGIN_X\" cy=\"TEMPORIGIN_Y\"", "\"596\" cy=\"266\"")

# The first Pakistan title is the green dot title. Let's find it specifically.
# It should say `title="Pakistan"` but we want the green dot to say `title="UAE"`
# Let's just fix the titles explicitly:
content = content.replace("fill=\"#22C55E\" className=\"animate-pulse shadow-[0_0_20px_#22C55E]\" title=\"Pakistan\"", "fill=\"#22C55E\" className=\"animate-pulse shadow-[0_0_20px_#22C55E]\" title=\"UAE\"")

# Wait, since I replaced title="UAE" with title="Pakistan" above, now there is a gold dot with title="Pakistan" that used to be UAE. And the green dot had title="Pakistan". 
# Oh I see! If both say Pakistan, I need to fix them.
# The green dot is the only one with fill="#22C55E". So replacing its title is easy.

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Replacement successful")
