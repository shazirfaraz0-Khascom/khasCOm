import sys

# Define all the cities and their coordinates
cities = {
    # Main Hubs
    "Pakistan": (620, 246),
    "UAE": (596, 266),
    
    # North America
    "USA_East": (180, 198),
    "USA_West": (120, 180),
    "Canada": (200, 150),
    "Mexico": (160, 240),
    
    # South America
    "Brazil": (300, 390),
    "Argentina": (280, 480),
    "Chile": (250, 450),
    "Colombia": (260, 320),
    
    # Europe
    "UK": (480, 168),
    "France": (480, 186),
    "Germany": (500, 174),
    "Spain": (460, 200),
    "Italy": (510, 200),
    "Scandinavia": (520, 120),
    "Russia_West": (560, 140),
    
    # Africa
    "Egypt": (550, 250),
    "Kenya": (550, 360),
    "South_Africa": (530, 450),
    "Nigeria": (480, 320),
    "Morocco": (450, 230),
    
    # Middle East
    "Saudi_Arabia": (580, 258),
    "Turkey": (540, 210),
    
    # South Asia
    "India": (650, 260),
    "Sri_Lanka": (660, 300),
    
    # East/SE Asia
    "China": (750, 200),
    "Japan": (820, 210),
    "South_Korea": (800, 200),
    "Indonesia": (750, 320),
    "Thailand": (720, 280),
    "Philippines": (780, 290),
    
    # Oceania
    "Australia_East": (850, 450),
    "Australia_West": (780, 430),
    "New_Zealand": (900, 480),
    
    # Russia East
    "Russia_East": (800, 100),
}

# Define active, animated paths
# (Start, End, Control_X, Control_Y, Duration)
active_paths = [
    # From Pakistan to world
    ("Pakistan", "USA_East", 400, 150, 20),
    ("Pakistan", "UK", 550, 180, 15),
    ("Pakistan", "UAE", 610, 255, 8),
    ("Pakistan", "South_Africa", 580, 350, 18),
    ("Pakistan", "Japan", 720, 230, 16),
    ("Pakistan", "Australia_East", 750, 350, 18),
    ("Pakistan", "China", 685, 223, 12),
    ("Pakistan", "Germany", 560, 200, 14),
    
    # From UAE to world
    ("UAE", "USA_East", 400, 200, 22),
    ("UAE", "Brazil", 400, 350, 25),
    ("UAE", "Kenya", 580, 300, 12),
    ("UAE", "Indonesia", 680, 280, 16),
    ("UAE", "UK", 530, 200, 16),
    
    # Inter-regional
    ("USA_East", "UK", 330, 160, 18),
    ("USA_West", "USA_East", 150, 189, 10),
    ("UK", "Germany", 490, 170, 8),
    ("Brazil", "South_Africa", 420, 450, 22),
    ("South_Africa", "Kenya", 540, 400, 14),
    ("Japan", "Australia_East", 830, 330, 18),
    ("Canada", "Germany", 350, 140, 18),
    ("China", "Japan", 785, 205, 10),
]

# Generate Base Mesh (Lots of faint background lines to make it look dense)
mesh_paths = []
# Create a dense network by randomly linking nearby cities
import math

def distance(p1, p2):
    return math.sqrt((p1[0]-p2[0])**2 + (p1[1]-p2[1])**2)

city_names = list(cities.keys())
for i in range(len(city_names)):
    for j in range(i+1, len(city_names)):
        c1 = cities[city_names[i]]
        c2 = cities[city_names[j]]
        dist = distance(c1, c2)
        if dist < 200: # Only connect relatively nearby cities for mesh
            cx = (c1[0] + c2[0]) / 2
            cy = (c1[1] + c2[1]) / 2 - 20 # Slight curve
            mesh_paths.append(f'<path d="M {c1[0]} {c1[1]} Q {cx} {cy} {c2[0]} {c2[1]}" />')

svg_content = f'''        <svg viewBox="0 0 1000 600" className="absolute inset-0 w-full h-full" style={{{{ filter: "drop-shadow(0 0 12px rgba(200,161,74,0.5))" }}}} preserveAspectRatio="xMidYMid meet">
          
          {{/* Base mesh (lower opacity, static or slow dashed) */}}
          <g stroke="#C8A14A" strokeWidth="0.8" fill="transparent" opacity="0.4" className="animate-[dash_40s_linear_infinite]" strokeDasharray="3,3">
            {chr(10).join("            " + p for p in mesh_paths)}
          </g>

          {{/* Highlighted active routes (higher opacity, faster dashed) */}}
          <g stroke="#C8A14A" strokeWidth="2" fill="transparent" strokeDasharray="5,5">
'''
for start, end, cx, cy, duration in active_paths:
    c1 = cities[start]
    c2 = cities[end]
    svg_content += f'            <path d="M {c1[0]} {c1[1]} Q {cx} {cy} {c2[0]} {c2[1]}" className="animate-[dash_{duration}s_linear_infinite]" />\n'

svg_content += '''          </g>

          {/* Dots for all cities */}
          <g fill="#C8A14A">
'''

# Pakistan gets the green dot, others get yellow dots
for name, coords in cities.items():
    if name == "Pakistan":
        svg_content += f'            <circle cx="{coords[0]}" cy="{coords[1]}" r="6" fill="#22C55E" className="animate-pulse shadow-[0_0_20px_#22C55E]" title="Pakistan" />\n'
    elif name == "UAE":
        svg_content += f'            <circle cx="{coords[0]}" cy="{coords[1]}" r="5" fill="#22C55E" className="animate-pulse shadow-[0_0_15px_#22C55E]" title="UAE" />\n'
    else:
        # To make yellow dots more visible, we add a drop shadow filter explicitly or use Tailwind shadow classes if they worked in SVG. 
        # In SVG, tailwind shadow doesn't work on <circle> directly unless we use an SVG filter. 
        # But we can simulate glow by drawing a larger circle with low opacity underneath!
        svg_content += f'            <circle cx="{coords[0]}" cy="{coords[1]}" r="8" fill="#C8A14A" opacity="0.3" className="animate-pulse" />\n'
        svg_content += f'            <circle cx="{coords[0]}" cy="{coords[1]}" r="3.5" fill="#C8A14A" className="animate-pulse" title="{name.replace("_", " ")}" />\n'

svg_content += '''          </g>
        </svg>'''

import re

file_path = r"D:\meem Organic World\Website\meemorganicworld\components\home\HomeClient.tsx"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Replace the existing svg block
pattern = re.compile(r'<svg viewBox="0 0 1000 600".*?</svg>', re.DOTALL)
new_content = pattern.sub(svg_content, content)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(new_content)

print("SVG replaced successfully.")
